<template>
  <UContainer>
    <div class="flex flex-col gap-2 pt-4">
      <h1 class="text-xl font-bold">Customer Feedback</h1>
      <div class="w-full">
        <UButton
          @click="expandableFormHandler"
          :label="isExpandForm ? 'Batalkan' : 'Tambah Feedback '"
          variant="soft"
          class="border border-primary w-56"
          :class="shouldBeRemoveClickAbleEvent ? 'pointer-events-none' : ''"
          block
          :icon="isExpandForm ? 'lucide:circle-x' : 'lucide:circle-fading-plus'"
        />
      </div>

      <div
        class="w-full overflow-hidden transition-all duration-300 rounded-xl"
        :class="[
          isExpandForm
            ? 'h-72 opacity-100 shadow bg-gray-100/40 border border-gray-300'
            : 'h-0 opacity-0',
        ]"
      >
        <div class="px-4 py-2 flex flex-col" v-if="shouldBeMountedForm">
          <p class="font-bold opacity-70 mb-4">Kirim Feedback</p>
          <FeedbackForm @submit="submitHandler" />
        </div>
      </div>

      <FeedbackTable
        @deleteFeedback="deleteFeedbackHandler"
        @click:editFeedback="editFeedbackHandler"
        :dataSource="feedbackTableData"
        :isLoading="feedbackStatus === 'pending'"
      />
    </div>
    <UModal
      title="Modal with close button"
      close-icon="i-lucide-arrow-right"
      v-model:open="isOpenEditModal"
    >
      <template #content>
        <div class="p-4 pb-6">
          <div
            class="flex items-center justify-between mb-4 pb-2 border-b border-gray-300"
          >
            <p class="font-bold">Edit Feedback</p>
            <UButton
              @click="isOpenEditModal = false"
              variant="link"
              size="xl"
              icon="lucide:circle-x"
              class="shadow-none"
            />
          </div>
          <FeedbackEditForm
            :data="feedbackEditableData"
            @submit="submitHandler"
          />
        </div>
      </template>
    </UModal>
  </UContainer>
</template>

<script setup lang="ts">
const {
  data: feedback,
  status: feedbackStatus,
  refresh: refreshFeedback,
} = useAsyncData(
  "feedback",
  () =>
    $fetch("/api/feedback", {
      method: "GET",
    }),
  {
    server: true,
    lazy: true,
  }
);
const isOpenEditModal = ref(false);
const isExpandForm = ref(false);
const feedbackEditableData = ref<Record<string, any>>();
const shouldBeMountedForm = ref(false);
const shouldBeRemoveClickAbleEvent = ref(false);
const feedbackTableData = computed(() => {
  if (Array.isArray(feedback.value)) {
    const formated = feedback.value?.map(
      (item: Record<string, any>, i: number) => ({
        number: i + 1,
        id: item.id,
        name: item.name,
        email: item.email,
        message: item.message,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      })
    );
    return formated;
  }
});

const expandableFormHandler = () => {
  shouldBeRemoveClickAbleEvent.value = true;
  if (isExpandForm.value) {
    isExpandForm.value = false;
    setTimeout(() => {
      shouldBeMountedForm.value = false;
      shouldBeRemoveClickAbleEvent.value = false;
    }, 500);
  } else {
    setTimeout(() => {
      shouldBeMountedForm.value = true;
      shouldBeRemoveClickAbleEvent.value = false;
    });
    isExpandForm.value = true;
  }
};

const submitHandler = () => {
  refreshFeedback();
  isExpandForm.value = false;
  setTimeout(() => {
    shouldBeMountedForm.value = false;
    shouldBeRemoveClickAbleEvent.value = false;
  }, 500);
  isOpenEditModal.value = false;
};
const editFeedbackHandler = (e: any) => {
  isOpenEditModal.value = true;
  feedbackEditableData.value = e;
};

const deleteFeedbackHandler = (id: string) => {
  refreshFeedback();
};
</script>
