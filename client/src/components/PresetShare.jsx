import { CopyIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { useState } from 'react';

export function PresetShare({ schema }) {
  const [apiUrl, setApiUrl] = useState('');
  const [loading, setLoading] = useState(false);

  function parseMinifiedSchema(minifiedSchema) {
    const formattedSchema = minifiedSchema.split(' ').join('\n');
    return formattedSchema;
  }

  const generateMockApi = async () => {
    setLoading(true);
    try {
      const minifiedSchema = schema.replace(/\s+/g, ' ').trim();
      console.log(minifiedSchema);

      const formattedSchema = parseMinifiedSchema(minifiedSchema);

      const response = await fetch('http://api.zerotogql.com/create-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ schema: formattedSchema }),
      });

      const data = await response.json();

      const inputUrl = data.url;
      const newUrl = inputUrl.replace('https://', 'http://') + '/graphql';

      setApiUrl(newUrl);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button onClick={generateMockApi}>{loading ? 'Loading...' : 'Generate'}</Button>
      </PopoverTrigger>

      <PopoverContent align="end" className={`w-[520px] ${loading && 'hidden'}`}>
        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <h3 className="text-lg font-semibold">Share api</h3>
          <p className="text-sm text-muted-foreground">Here's a playground link to your generated api</p>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" value={apiUrl} readOnly className="h-9" />
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
