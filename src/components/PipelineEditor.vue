<template>
  <v-container fluid>
    <h2 class="mb-3 ml-1">Pipeline</h2>
    <v-expansion-panels hover inset>
      <v-expansion-panel v-for="item in state.pipe" :key="item.id">
        <v-expansion-panel-header :color="item.color">{{ item.name }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-col>
            <div v-if="item.descriptors">
              <v-row v-for="([key, descriptor], index) in Object.entries(item.descriptors)" :key="index">
                <v-slider
                  v-if="descriptor.type === 'number'"
                  v-model="item.options[key]"
                  :label="descriptor.display"
                  :min="descriptor.range[0]"
                  :max="descriptor.range[1]"
                  :step="descriptor.steps ? 1 : 0"
                  thumb-label
                />
                <v-switch
                  v-else-if="descriptor.type === 'boolean'"
                  v-model="item.options[key]"
                  :label="descriptor.display"
                />
              </v-row>
            </div>
            <v-row>
              <v-btn block outlined @click="() => removeItem(item)"> Delete <v-icon>mdi-delete-outline</v-icon> </v-btn>
            </v-row>
          </v-col>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-menu offset-y max-width="auto">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" outlined color="primary" class="mt-2" block>
          <v-icon>mdi-plus</v-icon>
          Add
        </v-btn>
      </template>
      <v-list>
        <div v-for="(item, index) in FrontPipelines" :key="index">
          <v-list-item v-if="Array.isArray(item)">
            <v-btn
              class="flex-grow-1"
              text
              v-for="(subItem, subIndex) in item"
              :key="subIndex"
              :color="subItem.color"
              @click="() => addItem(subItem)"
            >
              {{ subItem.name }}
            </v-btn>
          </v-list-item>
          <v-list-item v-else @click="() => addItem(item)">
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </div>
      </v-list>
    </v-menu>
  </v-container>
</template>

<script lang="ts">
  import { defineComponent, reactive } from '@vue/composition-api';
  import Draggable from 'vuedraggable';
  import { FrontPipelineItem } from '@/pipeline/types';
  import { FrontPipelines } from '@/pipeline/FrontPipelines';

  export default defineComponent<{ pipeline: FrontPipelineItem[] }>({
    name: 'PipelineEditor',
    model: {
      prop: 'pipeline',
      event: 'pipeline',
    },
    props: {
      pipeline: Array,
    },
    components: {
      Draggable,
    },
    setup(props, { emit }) {
      const state = reactive<{ pipe: FrontPipelineItem[] }>({
        pipe: props.pipeline,
      });
      let internalCounter = state.pipe.length;
      const change = (event: any) => {
        emit('pipeline', state.pipe);
        return true;
      };
      const addItem = (item: FrontPipelineItem) => {
        const clone = { ...item, options: item.options ? { ...item.options } : void 0 };
        clone.id = internalCounter++;
        state.pipe.push(clone);
        emit('pipeline', state.pipe);
      };
      const removeItem = (item: FrontPipelineItem) => {
        state.pipe = state.pipe.filter(x => x.id !== item.id);
        emit('pipeline', state.pipe);
      };

      return {
        change,
        state,
        FrontPipelines,
        addItem,
        removeItem,
      };
    },
  });
</script>

<style scoped></style>
