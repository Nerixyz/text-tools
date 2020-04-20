<template>
  <v-container class="flex-row fill-height">
    <v-textarea
      v-model="state.input"
      hide-details
      no-resize
      height="35vh"
      class="main-area text-input"
      outlined
      label="Input"
      @keyup="inputChange"
    ></v-textarea>
    <v-row>
      <v-col>
        <v-btn outlined @click="showPipeline">
          <v-icon>mdi-filter-outline</v-icon>
          Edit Pipeline
        </v-btn>
      </v-col>
    </v-row>
    <v-textarea
      id="output-area"
      v-model="state.output"
      hide-details
      no-resize
      height="35vh"
      class="main-area text-output"
      outlined
      type=""
      label="Output"
      readonly
      :loading="state.loading"
      :error="state.isError"
    ></v-textarea>
    <v-row>
      <v-col>
        <v-btn outlined @click="copyOutput" :disabled="state.isError">
          <v-icon>mdi-clipboard-multiple-outline</v-icon>
          Copy
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog v-model="pipeline.isShown" @click:outside="editorClose" width="30vw">
      <v-card outlined>
        <PipelineEditor v-model="pipeline.data" />
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
  import { defineComponent, reactive } from '@vue/composition-api';
  import executeWorker from '@/workers/executeWorker';
  import { FrontPipelineItem } from '@/pipeline/types';
  import PipelineEditor from '@/components/PipelineEditor.vue';
  import { readPipeline, writePipeline } from '@/pipeline/utilities';

  export default defineComponent({
    name: 'Editor',
    setup() {
      const state = reactive({
        input: '',
        output: '',
        loading: false,
        isError: false,
      });
      const pipeline = reactive<{ data: FrontPipelineItem[]; isShown: boolean }>({
        data: readPipeline(),
        isShown: false,
      });

      const execPipeline = async () => {
        state.loading = true;
        state.isError = false;
        try {
          state.output = await executeWorker(
            state.input,
            pipeline.data.map(x => x.toItem()),
          );
        } catch (e) {
          console.log(e);
          state.output = prettifyError(e);
          state.isError = true;
        }
        state.loading = false;
      };
      let lastInput = '';
      let timerRef: any = null;
      const inputChange = () => {
        if (state.input === lastInput) {
          return;
        }
        lastInput = state.input;
        timerRef && clearTimeout(timerRef);
        timerRef = setTimeout(execPipeline, 1000);
      };
      const editorClose = () => {
        writePipeline(pipeline.data);
        execPipeline();
      };
      return {
        inputChange,
        state,
        pipeline,
        showPipeline: () => (pipeline.isShown = !pipeline.isShown),
        editorClose,
        copyOutput: () => {
          copyToClipboard(state.output);
        },
      };
    },
    components: {
      PipelineEditor,
    },
  });

  function prettifyError(e: Error | string | any): string {
    let mainStr;
    if (typeof e === 'string') {
      mainStr = e;
    } else if (e.message) {
      mainStr = `${e.name} / ${e.message}\n${e.stack ?? 'No stack.'}`;
    } else {
      const str = e.toString();
      if (str !== '[object Object]') {
        mainStr = str;
      } else {
        mainStr = JSON.stringify(e, null, 2);
      }
    }
    return `An error occurred:\n${mainStr}\n\nIf you believe this is an issue with this Website, report it on GitHub.`;
  }

  /**
   * Thanks Hackernoon FeelsOkayMan
   * https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
   * @param {string} str
   */
  function copyToClipboard(str: string) {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected = document.getSelection()?.rangeCount ? document.getSelection()?.getRangeAt(0) : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
      document.getSelection()?.removeAllRanges();
      document.getSelection()?.addRange(selected);
    }
  }
</script>

<style scoped></style>
