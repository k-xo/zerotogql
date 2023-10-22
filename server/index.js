import express from 'express';
import dockerode from 'dockerode';
import fs from 'fs';
import { exec } from 'child_process';
import getPort from 'get-port';
import { fileURLToPath } from 'url';
import path from 'path';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import morgan from 'morgan';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Zero to GraphQL!',
  });
});

app.post('/create-api', async (req, res) => {
  try {
    const { schema } = req.body;

    const schemaName = `${Date.now()}.graphql`;
    const schemaDirectory = path.join(__dirname, 'schemas');
    const schemaPath = path.join(schemaDirectory, schemaName);
    fs.writeFileSync(schemaPath, schema);

    // Determine the next available port
    const hostPort = await getPort();

    const dockerCommand = `
    docker run -d \
    -p ${hostPort}:9002 \
    -v ${__dirname}/schemas:/usr/src/app/schemas \
    zero_graphql_image zero /usr/src/app/schemas/${schemaName}
  `;

    exec(dockerCommand, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error running Docker container: ${stderr}`);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }

      const randomName = uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
      });

      updateNginxConfig(randomName, hostPort)
        .then(() => {
          res.json({
            message: 'API Created!',
            url: `https://${randomName}.zerotogql.com`,
          });
        })
        .catch((error) => {
          console.error(`Error updating Nginx config: ${error}`);
          res.status(500).json({ message: 'Internal Server Error' });
        });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
});

const updateNginxConfig = async (containerId, hostPort) => {
  const nginxConfig = `
    server {
        listen 80;
        server_name ${containerId}.zerotogql.com;
    
        location / {
            proxy_pass http://localhost:${hostPort};
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
  `;

  // Append the new server block to the nginx.conf file (or to a dynamic configs include file)
  fs.appendFileSync('/etc/nginx/conf.d/my_dynamic_configs.conf', nginxConfig);

  // Reload Nginx to apply the new configuration
  exec('sudo nginx -s reload', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error reloading Nginx: ${stderr}`);
    }
  });
};

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
