<template>
  <div class="input__password">
    <input
      @input="updateValue"
      :value="value"
      :class="`input__input ${className}`"
      :placeholder="placeholder"
      :type="inputType"
      :data-name="name ?? ''"
    />

    <p v-if="error" class="input__error">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, withDefaults } from 'vue';
import './input.sass';

type InputType = 'text' | 'password';

interface IProps {
  placeholder: string;
  value: string;
  className?: string;
  name: string;
  inputType?: InputType;
  error?: boolean;
  errorMessage?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'text' as InputType,
  className: '',
  error: false,
  errorMessage: ''
});

const emit = defineEmits<{
  (e: 'update:value', value: string): void;
  (e: 'input-change', name: string): void;
}>();

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const name = target.dataset.name as string;

  emit('update:value', target.value);
  emit('input-change', name);
};
</script>
