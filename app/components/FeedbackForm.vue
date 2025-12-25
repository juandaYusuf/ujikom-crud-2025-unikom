<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <div class="flex gap-2">
      <div class="flex flex-col gap-[0.3rem]">
        <UFormField label="Nama" name="name">
          <UInput v-model="state.name" placeholder="Masukan nama anda" />
        </UFormField>

        <UFormField label="Email" name="email">
          <UInput v-model="state.email" placeholder="Masukan email anda" />
        </UFormField>
      </div>
      <UFormField label="Pesan" name="message" class="w-full">
        <UTextarea
          v-model="state.message"
          :rows="4"
          :maxrows="4"
          :autoresize="true"
          placeholder="Sampaikan pesan anda kepada kami"
          class="w-full"
        />
      </UFormField>
    </div>

    <div class="w-full flex justify-end">
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

const schema = z.object({
  name: z.string("Nama wajib diisi").min(2, "Setidaknya 2 karakter"),
  email: z.email("Email tidak valid"),
  message: z.string("Pesan wajib diisi").min(10, "Setidaknya 10 karakter"),
});

const state = reactive<Partial<z.output<typeof schema>>>({
  name: undefined,
  email: undefined,
  message: undefined,
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<z.output<typeof schema>>) {
  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
  });
  console.log(event.data);
}
</script>
