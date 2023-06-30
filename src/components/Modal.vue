<template>
  <TransitionRoot :show="activeModal" as="template">
    <Dialog as="div" class="relative z-[99999]">
      <TransitionChild :enter="noFade ? '' : 'duration-300 ease-out'" :enter-from="noFade ? '' : 'opacity-0'"
        :enter-to="noFade ? '' : 'opacity-100'" :leave="noFade ? '' : 'duration-200 ease-in'"
        :leave-from="noFade ? '' : 'opacity-100'" :leave-to="noFade ? '' : 'opacity-0'">
        <div class="fixed inset-0 bg-slate-900/50 backdrop-filter backdrop-blur-sm" v-if="disableBackdrop === false" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full justify-center text-center p-6" :class="centered ? 'items-center' : 'items-start '">
          <TransitionChild as="template" :enter="noFade ? '' : 'duration-300  ease-out'"
            :enter-from="noFade ? '' : 'opacity-0 scale-95'" :enter-to="noFade ? '' : 'opacity-100 scale-100'"
            :leave="noFade ? '' : 'duration-200 ease-in'" :leave-from="noFade ? '' : 'opacity-100 scale-100'"
            :leave-to="noFade ? '' : 'opacity-0 scale-95'">
            <DialogPanel
              class="space-y-3 w-full transform overflow-hidden rounded-md panel p-5 border-0 text-left align-middle shadow-xl transition-all"
              :class="sizeClass">
              <div class="relative overflow-hidden flex justify-between" :class="themeClass">
                <h2 v-if="title" class="capitalize leading-6 tracking-wider font-medium text-base">
                  {{ title }}
                </h2>
                <button @click="close" class="right-9 text-white-dark hover:text-dark outline-none">
                  <Icon icon="heroicons:x-mark" class="w-5 h-5" />
                </button>
              </div>
              <div class="pt-3" :class="scrollContent ? 'overflow-y-auto max-h-[700px]' : ''">
                <slot />
              </div>
              <div class="flex justify-end space-x-3"
                v-if="$slots.footer">
                <slot name="footer"></slot>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from '@headlessui/vue';

export default {
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
  },

  props: {
    centered: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Basic Modal',
    },
    label: {
      type: String,
      default: 'Basic Modal',
    },
    disableBackdrop: {
      type: Boolean,
      default: false,
    },
    noFade: {
      type: Boolean,
      default: false,
    },
    themeClass: {
      type: String,
      default:
        'dark:text-dark-light',
    },
    sizeClass: {
      type: String,
      default: 'max-w-md',
    },
    scrollContent: {
      type: Boolean,
      default: false,
    },
    activeModal: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const close = () => {
      emit('close');
    };
    return {
      close,
    };
  },
};
</script>
