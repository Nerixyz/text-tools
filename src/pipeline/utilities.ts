import { FrontPipelineItem, PipelineData } from '@/pipeline/types';
import { Buffer } from 'buffer';
import { FrontPipelines } from '@/pipeline/FrontPipelines';

export function expectString(data: PipelineData ): string {
  if(typeof data === 'string')
    return data;

  return data.toString();
}

export function expectBuffer(data: PipelineData | Uint8Array): Buffer {
  if(typeof data === 'string')
    return Buffer.from(data);
  if(Buffer.isBuffer(data))
    return data;

  return Buffer.from(data);
}

function getQueryParam(param: string): string | undefined {
  // no need to parse here
  return new RegExp('[?&]' + param + '=([^&#]*)', 'i').exec(document.URL)?.[1];
}

function parseQuery(query: string): { [x: string]: string } {
  if (query?.includes('#')) {
    query = query.substring(0, query.indexOf('#'));
  }
  if (!query || !query.includes('?') || query.length < 2) return {};

  query = query?.substring(1);
  return Object.fromEntries(query.split('&').map(x => x.split('=').map(x => decodeURIComponent(x))));
}

function encodeQuery(query: { [x: string]: string }): string {
  return `?${Object.entries(query)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')}`;
}

function updateUrl(pipe: string) {
  if (!document.location.search?.includes('#')) {
    const parsedQuery = parseQuery(document.location.search);
    parsedQuery.pipeline = pipe;
    history.pushState({}, 'Text Tools', encodeQuery(parsedQuery));
  }
}

export function readPipeline(): FrontPipelineItem[] {
  const saved = getQueryParam('pipeline');
  if (!saved) return [];
  try {
    return JSON.parse(atob(decodeURIComponent(saved)))
      .map((itemIn: any) => {
        const found = FrontPipelines.find(p => p.typeId === itemIn.id);
        if (!found) {
          console.error('Failed to parse', itemIn);
          return null;
        }
        return {
          ...found,
          options: itemIn.options,
        };
      })
      .filter(Boolean);
  } catch (e) {
    console.error(e);
    return [];
  }
}

export function writePipeline(pipe: FrontPipelineItem[]) {
  updateUrl(btoa(JSON.stringify(pipe.map(x => ({ id: x.typeId, options: x.options })))));
}

