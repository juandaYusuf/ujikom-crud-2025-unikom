<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-2 h-56 relative"
    @submit="onSubmit"
  >
    <div class="flex gap-2">
      <div class="flex flex-col gap-[0.3rem] border-r border-gray-300 pr-2">
        <UFormField label="Nama" name="name">
          <UInput
            v-model="state.name"
            placeholder="Masukan nama anda"
            size="xl"
            class="w-56"
          />
        </UFormField>

        <UFormField label="Email" name="email">
          <UInput
            v-model="state.email"
            placeholder="Masukan email anda"
            size="xl"
            class="w-56"
          />
        </UFormField>
      </div>
      <UFormField label="Pesan" name="message" class="w-full">
        <UTextarea
          v-model="state.message"
          size="xl"
          :rows="4"
          :maxrows="4"
          :autoresize="true"
          placeholder="Sampaikan pesan anda kepada kami"
          class="w-full"
        />
      </UFormField>
    </div>

    <div class="w-full items-end flex justify-end absolute bottom-0">
      <UButton
        type="submit"
        class="w-40 border border-primary"
        block
        variant="soft"
        size="lg"
      >
        Submit
      </UButton>
    </div>
  </UForm>
</template>

<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import { id } from "zod/locales";

const props = defineProps<{
  data: Record<string, any> | undefined;
}>();
const emit = defineEmits(["submit"]);
const schema = z.object({
  name: z.string("Nama wajib diisi").min(2, "Setidaknya 2 karakter"),
  email: z.email("Email tidak valid"),
  message: z.string("Pesan wajib diisi").min(10, "Setidaknya 10 karakter"),
});
const state = reactive<Partial<z.output<typeof schema>>>({
  name: props.data?.name,
  email: props.data?.email,
  message: props.data?.message,
});
const toast = useToast();

async function onSubmit(event: FormSubmitEvent<z.output<typeof schema>>) {
  console.log(props.data?.id,)
  try {
    const reqBody = {
      id: props.data?.id,
      name: event.data.name,
      email: event.data.email,
      message: event.data.message,
    };
    const res = await $fetch("/api/feedback", {
      method: "PUT",
      body: reqBody,
    });

    if (res.success) {
      toast.add({
        title: "Success",
        description: "The form has been submitted.",
        color: "success",
      });
    }
  } catch (err) {
    toast.add({
      title: "error",
      description: "Something went wrong.",
      color: "error",
    });
  } finally {
    emit("submit");
  }
}
</script>
