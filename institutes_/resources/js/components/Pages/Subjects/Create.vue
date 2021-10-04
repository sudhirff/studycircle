<template>
    <div>
        <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
            <h2 class="text-lg font-medium mr-auto">Add New SUbject</h2>
            <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
                <router-link to="/subjects"
                            class="btn box text-gray-700 dark:text-gray-300 mr-2 flex items-center ml-auto sm:ml-0"
                            ><ArrowLeftCircleIcon class="w-4 h-4 mr-2" />Back
                </router-link>
            </div>
        </div>
        <div class="pos intro-y grid grid-cols-12 gap-5 mt-5">
            
            <div class="intro-y col-span-12 lg:col-span-8">
                <!-- BEGIN: Post Content -->
                <div class="alert alert-danger show flex items-center mb-2" role="alert" v-if="isErrored">
                    <AlertOctagonIcon class="w-6 h-6 mr-2" />
                    {{ message }}
                </div>
                <form @submit.prevent = "submitForm" class="validate-form">
                    <div class="modal-body">
                        <div>
                            <label for="form-name" class="form-label">Name</label>
                            <input id="form-name" 
                                    type="text" 
                                    class="form-control" 
                                    placeholder="Enter name of role."
                                    v-model.trim="subject.name"
                                    :class="{ 'border-theme-24': submitted && v$.name.$error }"
                                    />
                            <span v-if="submitted && v$.name.$error" class="text-theme-24 mt-2">
                                {{ v$.name.$errors[0].$message }}
                            </span>
                        </div>
                        <!--<div>
                            <label for="form-permission" class="form-label">Permission</label>

                            <div class="form-check mt-2"
                                v-for="permission in subjects"
                                :key="permission.id">
                                <input :id="permission.name" 
                                        class="form-check-input" 
                                        type="checkbox" 
                                        v-model="role.subjects"
                                        :value="permission.id" />
                                <label class="form-check-label" 
                                        :for="permission.name">
                                        {{ permission.name }}
                                </label>
                            </div>
                            <span v-if="submitted && v$.subjects.$error" class="text-theme-24 mt-2">
                                {{ v$.subjects.$errors[0].$message }}
                            </span>
                        </div>-->
                    </div>
                    <!-- BEGIN: Slide Over Footer -->
                    <div class="modal-footer text-right w-full absolute bottom-0">
                        <button type="button" 
                                data-dismiss="modal" 
                                class="btn btn-outline-secondary w-20 mr-1" 
                                >
                            Cancel
                        </button>
                        <button type="submit" class="btn btn-primary w-20">
                            Save
                        </button>
                    </div>
                    <!-- END: Slide Over Footer -->
                </form>
            </div>
            <!-- END: Post Content -->
            <!-- BEGIN: Post Info -->
            <div class="col-span-12 lg:col-span-4">
                <div class="intro-y box p-5">
                <div>
                    <label class="form-label">Written By</label>
                    <div class="dropdown">
                    <div
                        class="dropdown-toggle btn w-full btn-outline-secondary dark:bg-dark-2 dark:border-dark-2 flex items-center justify-start"
                        role="button"
                        aria-expanded="false"
                    >
                        <div class="w-6 h-6 image-fit mr-3">
                        <img
                            class="rounded"
                            alt="Icewall Tailwind HTML Admin Template"
                            :src="require(`@/assets/images/${$f()[0].photos[0]}`)"
                        />
                        </div>
                        <div class="truncate">{{ $f()[0].users[0].name }}</div>
                        <ChevronDownIcon class="w-4 h-4 ml-auto" />
                    </div>
                    <div class="dropdown-menu w-full">
                        <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                        <a
                            v-for="(faker, fakerKey) in $_.take($f(), 5)"
                            :key="fakerKey"
                            href="javascript:;"
                            class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
                        >
                            <div class="w-6 h-6 absolute image-fit mr-3">
                            <img
                                class="rounded"
                                alt="Icewall Tailwind HTML Admin Template"
                                :src="require(`@/assets/images/${faker.photos[0]}`)"
                            />
                            </div>
                            <div class="ml-8 pl-1">{{ faker.users[0].name }}</div>
                        </a>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="mt-3">
                    <label for="post-form-2" class="form-label">Post Date</label>
                    <Litepicker
                    id="post-form-2"
                    v-model="salesReportFilter"
                    :options="{
                        autoApply: false,
                        showWeekNumbers: true,
                        dropdowns: {
                        minYear: 1990,
                        maxYear: null,
                        months: true,
                        years: true
                        }
                    }"
                    class="form-control"
                    />
                </div>
                <div class="mt-3">
                    <label for="post-form-3" class="form-label">Categories</label>
                    <TailSelect
                    id="post-form-3"
                    v-model="categories"
                    :options="{
                        search: false,
                        hideSelected: true,
                        hideDisabled: true,
                        multiLimit: 15,
                        multiShowCount: false,
                        multiContainer: true,
                        classNames: 'w-full'
                    }"
                    multiple
                    >
                    <option value="1">Horror</option>
                    <option value="2">Sci-fi</option>
                    <option value="3">Action</option>
                    <option value="4">Drama</option>
                    <option value="5">Comedy</option>
                    </TailSelect>
                </div>
                <div class="mt-3">
                    <label for="post-form-4" class="form-label">Tags</label>
                    <TailSelect
                    id="post-form-4"
                    v-model="tags"
                    :options="{
                        search: false,
                        hideSelected: true,
                        hideDisabled: true,
                        multiLimit: 15,
                        multiShowCount: false,
                        multiContainer: true,
                        classNames: 'w-full'
                    }"
                    multiple
                    >
                    <option value="1" selected>Leonardo DiCaprio</option>
                    <option value="2">Johnny Deep</option>
                    <option value="3" selected>Robert Downey, Jr</option>
                    <option value="4">Samuel L. Jackson</option>
                    <option value="5">Morgan Freeman</option>
                    </TailSelect>
                </div>
                <div class="form-check flex-col items-start mt-3">
                    <label for="post-form-5" class="form-check-label ml-0 mb-2"
                    >Published</label
                    >
                    <input id="post-form-5" class="form-check-switch" type="checkbox" />
                </div>
                <div class="form-check flex-col items-start mt-3">
                    <label for="post-form-6" class="form-check-label ml-0 mb-2"
                    >Show Author Name</label
                    >
                    <input id="post-form-6" class="form-check-switch" type="checkbox" />
                </div>
                </div>
            </div>
            <!-- END: Post Info -->
            </div>
    </div>
</template>

<script>

import { useStore } from 'vuex';
import { ref, reactive, computed } from 'vue'

import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators'

import useCreateUpdate from '@/hooks/create_update.js';

export default {
    setup(props, context) {
        const store = useStore();
        const submitted = ref(false);
        
        const isErrored = ref(false);
        const message = ref('');
        const isLoading = ref(false);

        const subject = reactive({
            id: '',
            name: '',
        });

        const rules = computed(() => {
            return {
                name: {
                    required: helpers.withMessage('Please enter name of role.', required),
                },
            }
        });

        const v$ = useVuelidate (rules, subject);


        async function submitForm() {
            submitted.value = true;
            v$.value.$validate(); // checks all inputs

            if (!v$.value.$error) {
                isLoading.value = true;
                try {
                    await store.dispatch('roles/createRole', role);
                    isLoading.value = false;
                    submitted.value = false;
                } catch(e) {
                    isLoading.value = false;
                    isErrored.value = true;
                    message.value = "This name is already taken.";
                }
            } else {
                // if ANY fail validation
                
                return ;
            }
        }

        return {
            submitted,
            subject,
            submitForm,
            isLoading,
            isErrored,
            message,
            v$
        }
    },
}
</script>

<style>

</style>