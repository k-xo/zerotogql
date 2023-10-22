import { Inter } from 'next/font/google';
import { Textarea } from '@/components/ui/textarea';
import { PresetShare } from '@/components/PresetShare';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [schema, setSchema] = useState('');

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-16 ${inter.className}`}>
      <div className={`h-full w-full ${inter.className}`}>
        <div className="flex flex-col space-y-8">
          <div className="flex justify-end">
            <PresetShare schema={schema} />
          </div>
          <Textarea
            value={schema}
            onChange={(e) => setSchema(e.target.value)}
            placeholder="Paste your graphql schema here"
            className="min-h-[700px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
          />
        </div>
      </div>
    </main>
  );
}
