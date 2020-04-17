import { PipelineItem } from '@/pipeline/types';

let activeWorker: Worker | undefined;

export default function executeWorker(input: string, pipeline: PipelineItem[]): Promise<string> {
  if (!activeWorker) {
    activeWorker = new Worker('./mainWorker.ts', { type: 'module' });
  }
  activeWorker.postMessage({ message: input, pipeline });
  return new Promise<string>((resolve, reject) => {
    const onMessage = ({ data }: MessageEvent) => {
      resolve(data.message);
      activeWorker?.removeEventListener('message', onMessage);
    };
    const onError = ({ error }: ErrorEvent) => {
      reject(error);
      activeWorker?.removeEventListener('error', onError);
    };
    activeWorker?.addEventListener('message', onMessage);
    activeWorker?.addEventListener('error', onError);
  });
}
