<template>
  <UTable :data="data" :columns="columns" class="flex-1" />
</template>
<script setup lang="ts">
import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";
import type { Row } from "@tanstack/vue-table";
import { useClipboard } from "@vueuse/core";

const props = defineProps<{
  dataSource: Record<string, unknown>[] | undefined;
  isLoading: boolean;
}>();

const UButton = resolveComponent("UButton");
const UBadge = resolveComponent("UBadge");
const UDropdownMenu = resolveComponent("UDropdownMenu");

const toast = useToast();
const { copy } = useClipboard();

type TFeedback = {
  number: number;
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};

const data = computed(() => props.dataSource as TFeedback[]);

const columns: TableColumn<TFeedback>[] = [
  {
    accessorKey: "number",
    header: "#",
    cell: ({ row }) => `${row.getValue("number")}`,
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "message",
    header: "Pesan",
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal",
    cell: ({ row }) =>
      new Date(row.getValue("createdAt")).toLocaleDateString("id-ID"),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return h("div", { class: "flex gap-2" }, [
        h(UButton, {
          icon: "lucide:trash-2",
          variant: "soft",
          class: "border border-primary",
          size:"sm"
        }),
        h(UButton, {
          icon: "lucide:pen",
          variant: "soft",
          class: "border border-primary",
          size:"sm"
        }),
      ]);
    },
  },
];

function getRowItems(row: Row<TFeedback>) {
  return [
    {
      type: "label",
      label: "Actions",
    },
    {
      label: "Copy payment ID",
      onSelect() {
        copy(row.original.id);

        toast.add({
          title: "Payment ID copied to clipboard!",
          color: "success",
          icon: "i-lucide-circle-check",
        });
      },
    },
    {
      type: "separator",
    },
    {
      label: "View customer",
    },
    {
      label: "View payment details",
    },
  ];
}
</script>

<!-- <template>
  <UTable
    :data="dataSource"
    :loading="isLoading"
    v-model:column-visibility="columnVisibility"
    class="flex-1"
  >
    <template #column-actions="{ row }"> console.log(row) </template>
  </UTable>
</template>

<script lang="ts" setup>
const props = defineProps<{
  dataSource: Record<string, unknown>[] | undefined;
  isLoading: boolean;
}>();
const columnVisibility = ref({
  id: false,
  updated_at: false,
});
</script> -->
