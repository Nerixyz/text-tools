import { PipelineItem } from '@/pipeline/types';

let activeWorker: Worker | undefined;

export default function executeWorker(input: string, pipeline: PipelineItem[]): Promise<string> {
  try {
    if (!activeWorker) {
      activeWorker = new Worker('./mainWorker.ts', { type: 'module' });
    }
    const toMessage = { message: input, pipeline };

    return new Promise<string>((resolve, reject) => {
      console.log('exec', 'start', activeWorker);
      activeWorker?.postMessage(JSON.stringify(toMessage));
      const onMessage = ({ data }: MessageEvent) => {
        console.log('exec', 'message');
        const input = JSON.parse(data);
        if (input.error) {
          reject({ error: input.error, lastPipe: input.lastPipe });
        } else if (typeof input.message !== 'undefined') {
          resolve(input.message);
        } else {
          reject({ error: new Error('No message in event.') });
        }
        activeWorker?.removeEventListener('message', onMessage);
      };
      const onError = ({ error }: ErrorEvent) => {
        reject({ error });
        activeWorker?.removeEventListener('error', onError);
      };
      activeWorker?.addEventListener('message', onMessage);
      activeWorker?.addEventListener('error', onError);
    });
  }catch(e) {
    return Promise.reject({error: e});
  }
}
