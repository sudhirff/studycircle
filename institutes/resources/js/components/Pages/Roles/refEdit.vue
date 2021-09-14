<template>
  <div>
    <loader-component :loading="loading"></loader-component>
    <div>
      <div class="settings-main">
        <div class="new-role">
          <h4 class="title">{{ $t("LABEL_ROLE_TYPE") }}</h4>
          <div class="row">
            <div class="col-12">
              <div class="form-group mb-5">
                <div class="form-group">
                  <b-form-group
                    label-for="name"
                    :invalid-feedback="invalidFeedbackName"
                    label-class="right-col--label"
                  >
                    <label for="name" class="right-col--label">{{
                      $t("LABEL_ROLE_NAME")
                    }}</label>

                    <b-form-input
                      id="name"
                      class="form-control right-col--input"
                      v-model="name"
                      :state="stateName"
                      v-on:blur="handleNameBlured"
                      :placeholder="$t('LABEL_ROLE_NAME')"
                      required
                      trim
                    ></b-form-input>
                  </b-form-group>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="form-group mb-5">
                <label class="right-col--label"
                  >{{ $t("LABEL_PERMISSIONS") }}
                </label>
                <p>{{ $t("PERMISSIONS_TEXT") }}</p>
                <ul class="control-header">
                  <li>
                    <i class="fa fa-check"></i>
                    {{ $t("LABEL_PERMISSIONS_SELECT_ALL") }}
                  </li>
                  <li>
                    <i class="fa fa-list"></i>
                    {{ $t("LABEL_PERMISSIONS_INDEX") }}
                  </li>
                  <li>
                    <i class="fa fa-eye"></i>
                    {{ $t("LABEL_PERMISSIONS_VIEW") }}
                  </li>
                  <li>
                    <i class="fa fa-plus-square"></i>
                    {{ $t("LABEL_PERMISSIONS_ADD") }}
                  </li>
                  <li>
                    <i class="fa fa-pen-square"></i>
                    {{ $t("LABEL_PERMISSIONS_EDIT") }}
                  </li>
                  <li>
                    <i class="fa fa-trash"></i>
                    {{ $t("LABEL_PERMISSIONS_DELETE") }}
                  </li>
                </ul>
              </div>
            </div>

            <b-form-checkbox-group v-model="selectedPermissions" class="col-12">
              <div class="col-12">
                <ul class="role-ul">
                  <li>
                    <span
                      class="text-danger"
                      v-if="validationErrors.permissions"
                      >{{ validationErrors.permissions[0] }}</span
                    >
                  </li>
                  <li>
                    <div class="role-list">
                      <div class="col">
                        <label
                          class="
                            badge
                            b-green
                            badge-secondary
                            rounded-circle
                            main-badge
                          "
                        >
                          <i class="fa fa-users"></i>
                        </label>
                        <div>
                          <h6>{{ $t("LABEL_CUSTOMER_MANAGEMENT") }}</h6>
                          <p>{{ $t("TEXT_CUSTOMER_MANAGEMENT") }}</p>
                        </div>
                      </div>
                      <div class="col">
                        <ul>
                          <li>
                            <label class="custom-checkbox select-all">
                              <b-form-checkbox
                                :value="customers"
                                @click.native="
                                  selectAll(customerPermissions, $event)
                                "
                              >
                                <span class="checkmark clickable-row">
                                  <i
                                    class="fa fa-minus clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_SELECT_ALL')"
                                  ></i>
                                </span>
                              </b-form-checkbox>
                            </label>
                          </li>
                          <li
                            v-for="element of customerPermissions"
                            :key="element.value"
                          >
                            <label
                              class="custom-checkbox checkbox-parent same-icon"
                            >
                              <b-form-checkbox :value="element.value">
                                <span class="checkmark clickable-row">
                                  <i
                                    v-if="_.includes(element.text, indexText)"
                                    class="fa fa-list clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_INDEX')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, showText)"
                                    class="fa fa-eye clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_VIEW')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, createText)"
                                    class="fa fa-plus-square clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_ADD')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, updateText)"
                                    class="fa fa-pen-square clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_EDIT')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, destroyText)"
                                    class="fa fa-trash clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_DELETE')"
                                  ></i>
                                </span>
                              </b-form-checkbox>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div class="role-list">
                      <div class="col">
                        <label
                          class="
                            badge
                            b-green
                            badge-secondary
                            rounded-circle
                            main-badge
                          "
                        >
                          <i class="fa fa-users"></i>
                        </label>
                        <div>
                          <h6>{{ $t("LABEL_OWN_CUSTOMER_MANAGEMENT") }}</h6>
                          <p>{{ $t("TEXT_OWN_CUSTOMER_MANAGEMENT") }}</p>
                        </div>
                      </div>
                      <div class="col">
                        <ul>
                          <li>
                            <label class="custom-checkbox select-all">
                              <b-form-checkbox
                                :value="ownCustomers"
                                @click.native="
                                  selectAll(ownCustomerPermissions, $event)
                                "
                              >
                                <span class="checkmark clickable-row">
                                  <i
                                    class="fa fa-minus clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_SELECT_ALL')"
                                  ></i>
                                </span>
                              </b-form-checkbox>
                            </label>
                          </li>
                          <li
                            v-for="element of ownCustomerPermissions"
                            :key="element.value"
                          >
                            <label
                              class="custom-checkbox checkbox-parent same-icon"
                            >
                              <b-form-checkbox :value="element.value">
                                <span class="checkmark clickable-row">
                                  <i
                                    v-if="_.includes(element.text, indexText)"
                                    class="fa fa-list clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_INDEX')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, showText)"
                                    class="fa fa-eye clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_VIEW')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, createText)"
                                    class="fa fa-plus-square clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_ADD')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, updateText)"
                                    class="fa fa-pen-square clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_EDIT')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, destroyText)"
                                    class="fa fa-trash clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_DELETE')"
                                  ></i>
                                </span>
                              </b-form-checkbox>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div class="role-list">
                      <div class="col">
                        <label
                          class="
                            badge
                            b-orange
                            badge-secondary
                            rounded-circle
                            main-badge
                          "
                        >
                          <i class="fa fa-envelope"></i>
                        </label>
                        <div>
                          <h6>{{ $t("LABEL_ENQUIRIES_MANAGEMENT") }}</h6>
                          <p>{{ $t("TEXT_ENQUIRIES_MANAGEMENT") }}</p>
                        </div>
                      </div>
                      <div class="col">
                        <ul>
                          <li>
                            <label class="custom-checkbox select-all">
                              <b-form-checkbox
                                :value="enquiries"
                                @click.native="
                                  selectAll(enquiryPermissions, $event)
                                "
                              >
                                <span class="checkmark clickable-row">
                                  <i
                                    class="fa fa-minus clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_SELECT_ALL')"
                                  ></i>
                                </span>
                              </b-form-checkbox>
                            </label>
                          </li>
                          <li
                            v-for="element of enquiryPermissions"
                            :key="element.value"
                          >
                            <label
                              class="custom-checkbox checkbox-parent same-icon"
                            >
                              <b-form-checkbox :value="element.value">
                                <span class="checkmark clickable-row">
                                  <i
                                    v-if="_.includes(element.text, indexText)"
                                    class="fa fa-list clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_INDEX')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, showText)"
                                    class="fa fa-eye clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_VIEW')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, createText)"
                                    class="fa fa-plus-square clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_ADD')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, updateText)"
                                    class="fa fa-pen-square clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_EDIT')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, destroyText)"
                                    class="fa fa-trash clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_DELETE')"
                                  ></i>
                                </span>
                              </b-form-checkbox>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div class="role-list">
                      <div class="col">
                        <label
                          class="
                            badge
                            b-orange
                            badge-secondary
                            rounded-circle
                            main-badge
                          "
                        >
                          <i class="fa fa-envelope"></i>
                        </label>
                        <div>
                          <h6>{{ $t("LABEL_OWN_ENQUIRIES_MANAGEMENT") }}</h6>
                          <p>{{ $t("TEXT_OWN_ENQUIRIES_MANAGEMENT") }}</p>
                        </div>
                      </div>
                      <div class="col">
                        <ul>
                          <li>
                            <label class="custom-checkbox select-all">
                              <b-form-checkbox
                                :value="ownEnquiries"
                                @click.native="
                                  selectAll(ownEnquiryPermissions, $event)
                                "
                              >
                                <span class="checkmark clickable-row">
                                  <i
                                    class="fa fa-minus clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_SELECT_ALL')"
                                  ></i>
                                </span>
                              </b-form-checkbox>
                            </label>
                          </li>
                          <li
                            v-for="element of ownEnquiryPermissions"
                            :key="element.value"
                          >
                            <label
                              class="custom-checkbox checkbox-parent same-icon"
                            >
                              <b-form-checkbox :value="element.value">
                                <span class="checkmark clickable-row">
                                  <i
                                    v-if="_.includes(element.text, indexText)"
                                    class="fa fa-list clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_INDEX')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, showText)"
                                    class="fa fa-eye clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_VIEW')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, createText)"
                                    class="fa fa-plus-square clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_ADD')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, updateText)"
                                    class="fa fa-pen-square clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_EDIT')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, destroyText)"
                                    class="fa fa-trash clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_DELETE')"
                                  ></i>
                                </span>
                              </b-form-checkbox>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div class="role-list">
                      <div class="col">
                        <label
                          class="
                            badge
                            b-orange
                            badge-secondary
                            rounded-circle
                            main-badge
                          "
                        >
                          <i class="fas fa-map fa-fw"></i>
                        </label>
                        <div>
                          <h6>{{ $t("LABEL_ITINERARY_MANAGEMENT") }}</h6>
                          <p>{{ $t("TEXT_ITINERARY_MANAGEMENT") }}</p>
                        </div>
                      </div>
                      <div class="col">
                        <ul>
                          <li>
                            <label class="custom-checkbox select-all">
                              <b-form-checkbox
                                :value="itineraries"
                                @click.native="
                                  selectAll(itineraryPermissions, $event)
                                "
                              >
                                <span class="checkmark clickable-row">
                                  <i
                                    class="fa fa-minus clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_SELECT_ALL')"
                                  ></i>
                                </span>
                              </b-form-checkbox>
                            </label>
                          </li>
                          <li
                            v-for="element of itineraryPermissions"
                            :key="element.value"
                          >
                            <label
                              class="custom-checkbox checkbox-parent same-icon"
                            >
                              <b-form-checkbox :value="element.value">
                                <span class="checkmark clickable-row">
                                  <i
                                    v-if="_.includes(element.text, indexText)"
                                    class="fa fa-list clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_INDEX')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, showText)"
                                    class="fa fa-eye clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_VIEW')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, createText)"
                                    class="fa fa-plus-square clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_ADD')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, updateText)"
                                    class="fa fa-pen-square clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_EDIT')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, destroyText)"
                                    class="fa fa-trash clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_DELETE')"
                                  ></i>
                                </span>
                              </b-form-checkbox>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div class="role-list">
                      <div class="col">
                        <label
                          class="
                            badge
                            b-blue
                            badge-secondary
                            rounded-circle
                            main-badge
                          "
                        >
                          <i class="fas fa-poll fa-fw"></i>
                        </label>
                        <div>
                          <h6>{{ $t("LABEL_LIBRARIES_MANAGEMENT") }}</h6>
                          <p>{{ $t("TEXT_LIBRARIES_MANAGEMENT") }}</p>
                        </div>
                      </div>
                      <div class="col">
                        <ul>
                          <li>
                            <label class="custom-checkbox select-all">
                              <b-form-checkbox
                                :value="libraries"
                                @click.native="
                                  selectAll(libraryPermissions, $event)
                                "
                              >
                                <span class="checkmark clickable-row">
                                  <i
                                    class="fa fa-minus clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_SELECT_ALL')"
                                  ></i>
                                </span>
                              </b-form-checkbox>
                            </label>
                          </li>
                          <li
                            v-for="element of libraryPermissions"
                            :key="element.value"
                          >
                            <label
                              class="custom-checkbox checkbox-parent same-icon"
                            >
                              <b-form-checkbox :value="element.value">
                                <span class="checkmark clickable-row">
                                  <i
                                    v-if="_.includes(element.text, indexText)"
                                    class="fa fa-list clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_INDEX')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, showText)"
                                    class="fa fa-eye clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_VIEW')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, createText)"
                                    class="fa fa-plus-square clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_ADD')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, updateText)"
                                    class="fa fa-pen-square clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_EDIT')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, destroyText)"
                                    class="fa fa-trash clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_DELETE')"
                                  ></i>
                                </span>
                              </b-form-checkbox>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div class="role-list">
                      <div class="col">
                        <label
                          class="
                            badge
                            b-green
                            badge-secondary
                            rounded-circle
                            main-badge
                          "
                        >
                          <i class="fa fa-users"></i>
                        </label>
                        <div>
                          <h6>{{ $t("LABEL_ROLES_MANAGEMENT") }}</h6>
                          <p>{{ $t("TEXT_ROLES_MANAGEMENT") }}</p>
                        </div>
                      </div>
                      <div class="col">
                        <ul>
                          <li>
                            <label class="custom-checkbox select-all">
                              <b-form-checkbox
                                :value="roles"
                                @click.native="
                                  selectAll(rolePermissions, $event)
                                "
                              >
                                <span class="checkmark clickable-row">
                                  <i
                                    class="fa fa-minus clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_SELECT_ALL')"
                                  ></i>
                                </span>
                              </b-form-checkbox>
                            </label>
                          </li>
                          <li
                            v-for="element of rolePermissions"
                            :key="element.value"
                          >
                            <label
                              class="custom-checkbox checkbox-parent same-icon"
                            >
                              <b-form-checkbox :value="element.value">
                                <span class="checkmark clickable-row">
                                  <i
                                    v-if="_.includes(element.text, indexText)"
                                    class="fa fa-list clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_INDEX')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, showText)"
                                    class="fa fa-eye clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_VIEW')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, createText)"
                                    class="fa fa-plus-square clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_ADD')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, updateText)"
                                    class="fa fa-pen-square clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_EDIT')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, destroyText)"
                                    class="fa fa-trash clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_DELETE')"
                                  ></i>
                                </span>
                              </b-form-checkbox>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div class="role-list">
                      <div class="col">
                        <label
                          class="
                            badge
                            b-green
                            badge-secondary
                            rounded-circle
                            main-badge
                          "
                        >
                          <i class="fa fa-user"></i>
                        </label>
                        <div>
                          <h6>{{ $t("LABEL_USER_MANAGEMENT") }}</h6>
                          <p>{{ $t("TEXT_USER_MANAGEMENT") }}</p>
                        </div>
                      </div>
                      <div class="col">
                        <ul>
                          <li>
                            <label class="custom-checkbox select-all">
                              <b-form-checkbox
                                :value="users"
                                @click.native="
                                  selectAll(userPermissions, $event)
                                "
                              >
                                <span class="checkmark clickable-row">
                                  <i
                                    class="fa fa-minus clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_SELECT_ALL')"
                                  ></i>
                                </span>
                              </b-form-checkbox>
                            </label>
                          </li>
                          <li
                            v-for="element of userPermissions"
                            :key="element.value"
                          >
                            <label
                              class="custom-checkbox checkbox-parent same-icon"
                            >
                              <b-form-checkbox :value="element.value">
                                <span class="checkmark clickable-row">
                                  <i
                                    v-if="_.includes(element.text, indexText)"
                                    class="fa fa-list clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_INDEX')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, showText)"
                                    class="fa fa-eye clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_VIEW')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, createText)"
                                    class="fa fa-plus-square clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_ADD')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, updateText)"
                                    class="fa fa-pen-square clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_EDIT')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, destroyText)"
                                    class="fa fa-trash clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_DELETE')"
                                  ></i>
                                </span>
                              </b-form-checkbox>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div class="role-list">
                      <div class="col">
                        <label
                          class="
                            badge
                            b-orange
                            badge-secondary
                            rounded-circle
                            main-badge
                          "
                        >
                          <i class="fa fa-university"></i>
                        </label>
                        <div>
                          <h6>{{ $t("LABEL_LEGAL_MANAGEMENT") }}</h6>
                          <p>{{ $t("TEXT_LEGAL_MANAGEMENT") }}</p>
                        </div>
                      </div>
                      <div class="col">
                        <ul>
                          <li>
                            <label class="custom-checkbox select-all">
                              <b-form-checkbox
                                :value="legal"
                                @click.native="
                                  selectAll(legalPermissions, $event)
                                "
                              >
                                <span class="checkmark clickable-row">
                                  <i
                                    class="fa fa-minus clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_SELECT_ALL')"
                                  ></i>
                                </span>
                              </b-form-checkbox>
                            </label>
                          </li>
                          <li
                            v-for="element of legalPermissions"
                            :key="element.value"
                          >
                            <label
                              class="custom-checkbox checkbox-parent same-icon"
                            >
                              <b-form-checkbox :value="element.value">
                                <span class="checkmark clickable-row">
                                  <i
                                    v-if="_.includes(element.text, indexText)"
                                    class="fa fa-list clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_INDEX')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, showText)"
                                    class="fa fa-eye clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_VIEW')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, createText)"
                                    class="fa fa-plus-square clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_ADD')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, updateText)"
                                    class="fa fa-pen-square clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_EDIT')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, destroyText)"
                                    class="fa fa-trash clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_DELETE')"
                                  ></i>
                                </span>
                              </b-form-checkbox>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div class="role-list">
                      <div class="col">
                        <label
                          class="
                            badge
                            b-orange
                            badge-secondary
                            rounded-circle
                            main-badge
                          "
                        >
                          <i class="fas fa-cubes"></i>
                        </label>
                        <div>
                          <h6>{{ $t("LABEL_SUPPLIER") }}</h6>
                          <p>{{ $t("TEXT_SUPPLIER_MANAGEMENT") }}</p>
                        </div>
                      </div>
                      <div class="col">
                        <ul>
                          <li>
                            <label class="custom-checkbox select-all">
                              <b-form-checkbox
                                :value="suppliers"
                                @click.native="
                                  selectAll(supplierPermissions, $event)
                                "
                              >
                                <span class="checkmark clickable-row">
                                  <i
                                    class="fa fa-minus clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_SELECT_ALL')"
                                  ></i>
                                </span>
                              </b-form-checkbox>
                            </label>
                          </li>
                          <li
                            v-for="element of supplierPermissions"
                            :key="element.value"
                          >
                            <label
                              class="custom-checkbox checkbox-parent same-icon"
                            >
                              <b-form-checkbox :value="element.value">
                                <span class="checkmark clickable-row">
                                  <i
                                    v-if="_.includes(element.text, indexText)"
                                    class="fa fa-list clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_INDEX')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, showText)"
                                    class="fa fa-eye clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_VIEW')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, createText)"
                                    class="fa fa-plus-square clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_ADD')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, updateText)"
                                    class="fa fa-pen-square clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_EDIT')"
                                  ></i>
                                  <i
                                    v-if="_.includes(element.text, destroyText)"
                                    class="fa fa-trash clickable-row"
                                    v-b-tooltip.hover
                                    :title="$t('LABEL_PERMISSIONS_DELETE')"
                                  ></i>
                                </span>
                              </b-form-checkbox>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </b-form-checkbox-group>
            <div class="col-12">
              <div class="form-group text-center">
                <button class="btn btn-primary" v-if="!editing" @click="save">
                  {{ $t("BUTTON_SAVE") }}
                </button>
                <button class="btn btn-primary" v-else @click="update">
                  {{ $t("BUTTON_SAVE") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import constant from "../../constant";

export default {
  components: {},
  data() {
    return {
      formData: new FormData(),
      name: "",
      permissions: "",
      selectedPermissions: [],
      loading: true,
      nameBlured: false,
      editingId: null,
      validationErrors: {},
      customerPermissions: [],
      ownCustomerPermissions: [],
      enquiryPermissions: [],
      ownEnquiryPermissions: [],
      itineraryPermissions: [],
      libraryPermissions: [],
      rolePermissions: [],
      userPermissions: [],
      legalPermissions: [],
      supplierPermissions: [],
      indexText: "index",
      showText: "show",
      createText: "create",
      updateText: "update",
      destroyText: "destroy",
      ownCustomers: "own customers",
      customers: "customers",
      ownEnquiries: "own enquiries",
      enquiries: "enquiries",
      itineraries: "itineraries",
      libraries: "libraries",
      roles: "roles",
      users: "users",
      legal: "legal",
      suppliers: "suppliers",
      sections: [
        "customers",
        "own customers",
        "enquiries",
        "own enquiries",
        "itineraries",
        "libraries",
        "roles",
        "users",
        "legal",
        "suppliers",
      ],
    };
  },
  props: {
    editing: {
      type: Boolean,
      default: false,
      required: false,
    },
    roleEditingId: {
      type: Number,
      default: null,
      required: false,
    },
    redirectUrl: {
      type: String,
      default: null,
      required: false,
    },
  },
  computed: {
    stateName: function () {
      return this.validationErrors.name
        ? false
        : !this.nameBlured
        ? null
        : this.validateName;
    },
    validateName: function () {
      this.nameBlured = true;
      return this.name.length > 2 ? null : false;
    },
    invalidFeedbackName: function () {
      return this.validationErrors.name
        ? this.validationErrors.name[0]
        : this.$i18n.t("LABEL_VALIDATE_NAME");
    },
    constant: () => {
      return constant;
    },
  },
  created() {
    this.editingId = this.roleEditingId;
    this.fetchData();
  },
  methods: {
    selectAll: function (data, event) {
      data.map((element) => {
        if (event.target.checked) {
          this.selectedPermissions.push(element.value);
        } else {
          for (var i = 0; i < this.selectedPermissions.length; i++) {
            if (this.selectedPermissions[i] === element.value) {
              this.selectedPermissions.splice(i, 1);
            }
          }
        }
      });
    },
    handleNameBlured: function () {
      this.nameBlured = true;
      this.deleteValidationErrorsProp("name");
    },
    deleteValidationErrorsProp: function (prop) {
      if (this.validationErrors.hasOwnProperty(prop))
        this.$delete(this.validationErrors, prop);
    },
    fetchData: function () {
      let url =
        this.editing && this.editingId !== null
          ? constant.BASE_URL + "/roles/" + this.editingId + "/edit"
          : constant.BASE_URL + "/roles/create";
      axios
        .get(url)
        .then((response) => {
          this.loading = false;
          if (response.status == this.constant.HTTP_OK) {
            this.setInfo(response.data.data);
            if (this.editing && this.editingId !== null) {
              this.setEditingInfo(response.data.data.role);
            }
          }
        })
        .catch((error) => {
          this.loading = false;
          console.log(error.response);
        });
    },
    setInfo: function (data) {
      this.permissions = data.permissions;
      this.role = data.role;

      this.permissions.map((element) => {
        if (_.includes(element.name, this.ownCustomers)) {
          this.ownCustomerPermissions.push({
            value: element.id,
            text: element.name,
          });
        } else if (_.includes(element.name, this.customers)) {
          this.customerPermissions.push({
            value: element.id,
            text: element.name,
          });
        } else if (_.includes(element.name, this.ownEnquiries)) {
          this.ownEnquiryPermissions.push({
            value: element.id,
            text: element.name,
          });
        } else if (_.includes(element.name, this.enquiries)) {
          this.enquiryPermissions.push({
            value: element.id,
            text: element.name,
          });
        } else if (_.includes(element.name, this.itineraries)) {
          this.itineraryPermissions.push({
            value: element.id,
            text: element.name,
          });
        } else if (_.includes(element.name, this.libraries)) {
          this.libraryPermissions.push({
            value: element.id,
            text: element.name,
          });
        } else if (_.includes(element.name, this.roles)) {
          this.rolePermissions.push({ value: element.id, text: element.name });
        } else if (_.includes(element.name, this.users)) {
          this.userPermissions.push({ value: element.id, text: element.name });
        } else if (_.includes(element.name, this.legal)) {
          this.legalPermissions.push({ value: element.id, text: element.name });
        } else if (_.includes(element.name, this.suppliers)) {
          this.supplierPermissions.push({
            value: element.id,
            text: element.name,
          });
        }
      });
    },
    setEditingInfo: function (role) {
      this.id = role.id;
      this.name = role.name;
      role.permissions.map((element) => {
        this.selectedPermissions.push(element.id);
      });

      if (this.checkforSelectAll(this.ownCustomerPermissions)) {
        this.selectedPermissions.push(this.ownCustomers);
      }
      if (this.checkforSelectAll(this.customerPermissions)) {
        this.selectedPermissions.push(this.customers);
      }
      if (this.checkforSelectAll(this.ownEnquiryPermissions)) {
        this.selectedPermissions.push(this.ownEnquiries);
      }
      if (this.checkforSelectAll(this.enquiryPermissions)) {
        this.selectedPermissions.push(this.enquiries);
      }
      if (this.checkforSelectAll(this.itineraryPermissions)) {
        this.selectedPermissions.push(this.itineraries);
      }
      if (this.checkforSelectAll(this.libraryPermissions)) {
        this.selectedPermissions.push(this.libraries);
      }
      if (this.checkforSelectAll(this.rolePermissions)) {
        this.selectedPermissions.push(this.roles);
      }
      if (this.checkforSelectAll(this.userPermissions)) {
        this.selectedPermissions.push(this.users);
      }
      if (this.checkforSelectAll(this.legalPermissions)) {
        this.selectedPermissions.push(this.legal);
      }
      if (this.checkforSelectAll(this.supplierPermissions)) {
        this.selectedPermissions.push(this.suppliers);
      }
    },
    checkforSelectAll: function (data) {
      let count = 0;
      data.map((element) => {
        if (_.indexOf(this.selectedPermissions, element.value) != -1) {
          count++;
        }
      });
      if (count === data.length) {
        return true;
      } else {
        return false;
      }
    },
    save: function () {
      this.setInputData();
      this.loading = true;
      axios
        .post(
          constant.BASE_URL + "/roles",
          this.formData,
          this.constant.MULTIPART_HEADER_CONFIQ
        )
        .then((response) => {
          this.loading = false;
          if (response.status == this.constant.HTTP_OK) {
            if (this.redirectUrl !== null) {
              window.location.href = this.redirectUrl;
            }
          }
        })
        .catch((error) => {
          this.loading = false;
          if (
            error.response.status == this.constant.HTTP_UNPROCESSABLE_ENTITY
          ) {
            this.validationErrors = error.response.data.errors;
          }
        });
    },
    update: function (event) {
      this.setInputData();
      this.loading = true;
      this.formData.append("_method", "PATCH");
      axios
        .post(
          constant.BASE_URL + "/roles/" + this.id,
          this.formData,
          this.constant.MULTIPART_HEADER_CONFIQ
        )
        .then((response) => {
          this.loading = false;
          if (response.status == this.constant.HTTP_OK) {
            if (this.redirectUrl !== null && typeof event !== "undefined") {
              window.location.href = this.redirectUrl;
            }
          }
        })
        .catch((error) => {
          this.loading = false;
          if (
            error.response.status == this.constant.HTTP_UNPROCESSABLE_ENTITY
          ) {
            this.validationErrors = error.response.data.errors;
          }
        });
    },
    setInputData: function () {
      this.formData.append("name", this.name);
      this.formData.append(
        "permissions",
        _.uniq(_.difference(this.selectedPermissions, this.sections))
      );
    },
  },
  mounted() {
    //console.log('Role Component mounted.')
  },
};
</script>

<i18n>
{
 "en": {
 "LABEL_ROLE_NAME": "Role Name",
 "LABEL_ROLE_TYPE": "Role Type",
 "BUTTON_SAVE": "Save This Role",
 "LABEL_PERMISSIONS": "Permissions",
 "PERMISSIONS_TEXT": "Edit permissions by clicking select all or toggling individual permissions per category",
 "LABEL_VALIDATE_NAME": "Enter valid name",
 "LABEL_PERMISSIONS_SELECT_ALL": "Select All",
 "LABEL_PERMISSIONS_INDEX": "Index",
 "LABEL_PERMISSIONS_VIEW": "View",
 "LABEL_PERMISSIONS_ADD": "Add",
 "LABEL_PERMISSIONS_EDIT": "Edit",
 "LABEL_PERMISSIONS_DELETE": "Delete",
 "LABEL_CUSTOMER_MANAGEMENT": "All Customer Management",
 "TEXT_CUSTOMER_MANAGEMENT": "Permissions for creating and modifying all customers.",
 "LABEL_OWN_CUSTOMER_MANAGEMENT": "Own Customer Management",
 "TEXT_OWN_CUSTOMER_MANAGEMENT": "These permissions only work with the customers that the user created.",
 "LABEL_ENQUIRIES_MANAGEMENT": "Enquiries Management",
 "TEXT_ENQUIRIES_MANAGEMENT": "Permissions for modifying customers created by the user",
 "LABEL_OWN_ENQUIRIES_MANAGEMENT": "Own Enquiries Management",
 "TEXT_OWN_ENQUIRIES_MANAGEMENT": "Permissions for adding and modifying all itineraries in the library",
 "LABEL_ITINERARY_MANAGEMENT": "Itinerary Management",
 "TEXT_ITINERARY_MANAGEMENT": "Set who can create and set permissions to different itinerary",
 "LABEL_LIBRARIES_MANAGEMENT": "Library Management",
 "TEXT_LIBRARIES_MANAGEMENT": "Permissions for adding and modifying all templates in the library",
 "LABEL_ROLES_MANAGEMENT": "Roles Management",
 "TEXT_ROLES_MANAGEMENT": "Permissions for adding and managing other user roles",
 "LABEL_USER_MANAGEMENT": "User Management",
 "TEXT_USER_MANAGEMENT": "Permissions for adding and managing other users.",
 "LABEL_LEGAL_MANAGEMENT": "Legal Templates",
 "TEXT_LEGAL_MANAGEMENT": "Permissions for creating and modifying legal templates.",
 "LABEL_SUPPLIER": "Suppliers Management",
 "TEXT_SUPPLIER_MANAGEMENT": "Permissions for adding and managing suppliers."
 },
 "de": {
 "LABEL_ROLE_NAME": "Positionsname",
 "LABEL_ROLE_TYPE": "Positionsbezeichung",
 "BUTTON_SAVE": "Diese Position speichern",
 "LABEL_PERMISSIONS": "Befugnisse",
 "PERMISSIONS_TEXT": "Befugnisse durch alles auswählen klicken oder einzeln pro Kategorie bearbeiten",
 "LABEL_VALIDATE_NAME": "Mindestens 3 Buchstaben angeben",
 "LABEL_PERMISSIONS_SELECT_ALL": "Alles auswählen",
 "LABEL_PERMISSIONS_INDEX": "Index",
 "LABEL_PERMISSIONS_VIEW": "Ansicht",
 "LABEL_PERMISSIONS_ADD": "Hinzufügen",
 "LABEL_PERMISSIONS_EDIT": "Bearbeiten",
 "LABEL_PERMISSIONS_DELETE": "Löschen",
 "LABEL_CUSTOMER_MANAGEMENT": "Kunden Management",
 "TEXT_CUSTOMER_MANAGEMENT": "Befugnis zum Erstellen und Bearbeiten aller Kunden",
 "LABEL_OWN_CUSTOMER_MANAGEMENT": "Eigenes Kunden Management",
 "TEXT_OWN_CUSTOMER_MANAGEMENT": "Befugnis zum Bearbeiten der von diesem Nutzer erstellten Kunden",
 "LABEL_ENQUIRIES_MANAGEMENT": "Anfragen Management",
 "TEXT_ENQUIRIES_MANAGEMENT": "Befugnis zum Erstellen und Bearbeiten aller Anfragen",
 "LABEL_OWN_ENQUIRIES_MANAGEMENT": "Eigenes Anfragen Management",
 "TEXT_OWN_ENQUIRIES_MANAGEMENT": "Befugnis zum Bearbeiten der von diesem Nutzer erstellten Anfragen",
 "LABEL_ITINERARY_MANAGEMENT": "Reiserouten Management",
 "TEXT_ITINERARY_MANAGEMENT": "Befugnis zum Erstellen und Bearbeiten aller Reiserouten in der Bibliothek",
 "LABEL_LIBRARIES_MANAGEMENT": "Bibliothek Management",
 "TEXT_LIBRARIES_MANAGEMENT": "Befugnis zum Erstellen und Bearbeiten aller Vorlagen in der Bibliothek",
 "LABEL_ROLES_MANAGEMENT": "Positionen Management",
 "TEXT_ROLES_MANAGEMENT": "Befugnis zum Erstellen und Bearbeiten von Nutzer Positionen",
 "LABEL_USER_MANAGEMENT": "Nutzer Management",
 "TEXT_USER_MANAGEMENT": "Befugnis zum Erstellen und Bearbeiten anderer Nutzer",
 "LABEL_LEGAL_MANAGEMENT": "Rechtliche Vorlagen",
 "TEXT_LEGAL_MANAGEMENT": "Befugnis zum Erstellen und Bearbeiten von rechtlichen Vorlagen"
 },
 "it": {
 "LABEL_ROLE_NAME": "Nome del ruolo",
 "LABEL_ROLE_TYPE": "Tipo del ruolo",
 "BUTTON_SAVE": "Salva questo ruolo",
 "LABEL_PERMISSIONS": "Permessi",
 "PERMISSIONS_TEXT": "Modifica i permessi cliccando seleziona tutto o selezionando i permessi individuali per categoria",
 "LABEL_VALIDATE_NAME": "Immeti almeno 3 caratteri",
 "LABEL_PERMISSIONS_SELECT_ALL": "Seleziona tutto",
 "LABEL_PERMISSIONS_INDEX": "Indice",
 "LABEL_PERMISSIONS_VIEW": "Visualizza",
 "LABEL_PERMISSIONS_ADD": "Aggiungi",
 "LABEL_PERMISSIONS_EDIT": "Modifica",
 "LABEL_PERMISSIONS_DELETE": "Cancella",
 "LABEL_CUSTOMER_MANAGEMENT": "Gestione del cliente",
 "TEXT_CUSTOMER_MANAGEMENT": "Permessi per la creazione e la modifica di tutti i clienti.",
 "LABEL_OWN_CUSTOMER_MANAGEMENT": "Gestione del cliente propria",
 "TEXT_OWN_CUSTOMER_MANAGEMENT": "Permessi per modificare clienti creata dall'utente",
 "LABEL_ENQUIRIES_MANAGEMENT": "Gestione Pratiche",
 "TEXT_ENQUIRIES_MANAGEMENT": "Permessi per la creazione e la modifica di tutte le pratiche",
 "LABEL_OWN_ENQUIRIES_MANAGEMENT": "Gestione personale delle pratiche",
 "TEXT_OWN_ENQUIRIES_MANAGEMENT": "Permessi per la modifica dei clienti creata dall'utente",
 "LABEL_ITINERARY_MANAGEMENT": "Gestione dell'itinerario",
 "TEXT_ITINERARY_MANAGEMENT": "Permessi per aggiungere e modificare tutti gli itinerari in libreria",
 "LABEL_LIBRARIES_MANAGEMENT": "Gestione della libreria",
 "TEXT_LIBRARIES_MANAGEMENT": "Permessi per aggiongere e modificare tutti i modelli della libreria",
 "LABEL_ROLES_MANAGEMENT": "Gestione del ruolo",
 "TEXT_ROLES_MANAGEMENT": "Permessi per aggiungere e modificare gli altri ruoli dell'utente",
 "LABEL_USER_MANAGEMENT": "Gestione dell'utente",
 "TEXT_USER_MANAGEMENT": "Permessi per aggiungere e gestire altri utenti",
 "LABEL_LEGAL_MANAGEMENT": "Modelli legali",
 "TEXT_LEGAL_MANAGEMENT": "Permessi per creare e modificare i modelli legali"
 },
 "es": {
 "LABEL_ROLE_NAME": "Nombre del rol",
 "LABEL_ROLE_TYPE": "Tipo de rol",
 "BUTTON_SAVE": "Guardar este rol",
 "LABEL_PERMISSIONS": "Permisos",
 "PERMISSIONS_TEXT": "Edite los permisos haciendo clic en seleccionar todo o alternando permisos individuales por categoría.",
 "LABEL_VALIDATE_NAME": "Ingrese al menos 3 letras",
 "LABEL_PERMISSIONS_SELECT_ALL": "Seleccionar todo",
 "LABEL_PERMISSIONS_INDEX": "Índice",
 "LABEL_PERMISSIONS_VIEW": "Ver",
 "LABEL_PERMISSIONS_ADD": "Agregar",
 "LABEL_PERMISSIONS_EDIT": "Editar",
 "LABEL_PERMISSIONS_DELETE": "Eliminar",
 "LABEL_CUSTOMER_MANAGEMENT": "Administración de clientes",
 "TEXT_CUSTOMER_MANAGEMENT": "Permisos para crear y modificar todos los clientes.",
 "LABEL_OWN_CUSTOMER_MANAGEMENT": "Administrador de clientes propios",
 "TEXT_OWN_CUSTOMER_MANAGEMENT": "Permisos para modificar clientes creados por el usuario",
 "LABEL_ENQUIRIES_MANAGEMENT": "Administración de solicitudes",
 "TEXT_ENQUIRIES_MANAGEMENT": "Permisos para crear y modificar todas las consultas.",
 "LABEL_OWN_ENQUIRIES_MANAGEMENT": "Administración de solicitudes propias",
 "TEXT_OWN_ENQUIRIES_MANAGEMENT": "Permisos para modificar clientes creados por el usuario.",
 "LABEL_ITINERARY_MANAGEMENT": "Administración de itinerarios",
 "TEXT_ITINERARY_MANAGEMENT": "Permisos para agregar y modificar todos los itinerarios en la biblioteca",
 "LABEL_LIBRARIES_MANAGEMENT": "Administración de bibliotecas",
 "TEXT_LIBRARIES_MANAGEMENT": "Permisos para agregar y modificar todas las plantillas en la biblioteca",
 "LABEL_ROLES_MANAGEMENT": "Administración de roles",
 "TEXT_ROLES_MANAGEMENT": "Permisos para agregar y administrar otros roles de usuario",
 "LABEL_USER_MANAGEMENT": "Administración de usuarios",
 "TEXT_USER_MANAGEMENT": "Permisos para agregar y administrar otros usuarios",
 "LABEL_LEGAL_MANAGEMENT": "Plantillas legales",
 "TEXT_LEGAL_MANAGEMENT": "Permisos para crear y modificar plantillas legales"
 },
 "fr": {
 "LABEL_ROLE_NAME": "Nom du rôle",
 "LABEL_ROLE_TYPE": "Type de rôle",
 "BUTTON_SAVE": "Enregistrer ce rôle",
 "LABEL_PERMISSIONS": "Autorisations",
 "PERMISSIONS_TEXT": "Modifier les autorisations en cliquant sur Sélectionner tout ou en sélectionnant les autorisations individuelles par catégorie",
 "LABEL_VALIDATE_NAME": "Entrer au moins 3 lettres",
 "LABEL_PERMISSIONS_SELECT_ALL": "Selectionner tout",
 "LABEL_PERMISSIONS_INDEX": "Catalogue",
 "LABEL_PERMISSIONS_VIEW": "Voir",
 "LABEL_PERMISSIONS_ADD": "Ajouter",
 "LABEL_PERMISSIONS_EDIT": "Éditer",
 "LABEL_PERMISSIONS_DELETE": "Supprimer",
 "LABEL_CUSTOMER_MANAGEMENT": "Gestion des clients",
 "TEXT_CUSTOMER_MANAGEMENT": "Autorisation de créer et modifier tous les clients",
 "LABEL_OWN_CUSTOMER_MANAGEMENT": "Gestion de mes clients",
 "TEXT_OWN_CUSTOMER_MANAGEMENT": "Autorisation de modifier les clients créés par l'utilisateur",
 "LABEL_ENQUIRIES_MANAGEMENT": "Gestion des requêtes",
 "TEXT_ENQUIRIES_MANAGEMENT": "Autorisations de créer et modifier toutes les requêtes",
 "LABEL_OWN_ENQUIRIES_MANAGEMENT": "Gestion de mes requêtes",
 "TEXT_OWN_ENQUIRIES_MANAGEMENT": "Autorisation de modifier les clients créés par l'utilisateur",
 "LABEL_ITINERARY_MANAGEMENT": "Gestion d'itinéraire",
 "TEXT_ITINERARY_MANAGEMENT": "Autorisation d'ajouter et modifier tous les itinéraires de la bibliothèque",
 "LABEL_LIBRARIES_MANAGEMENT": "Gestion de la bibliothèque",
 "TEXT_LIBRARIES_MANAGEMENT": "Autorisation d'ajouter et modifier tous les modèles de la bibliothèque",
 "LABEL_ROLES_MANAGEMENT": "Gestion des rôles",
 "TEXT_ROLES_MANAGEMENT": "Autorisation d'ajouter et gérer d'autres rôles d'utilisateurs",
 "LABEL_USER_MANAGEMENT": "Gestion des utilisateurs",
 "TEXT_USER_MANAGEMENT": "Autorisation d'ajouter et gérer des utilisateurs",
 "LABEL_LEGAL_MANAGEMENT": "Modèles juridiques",
 "TEXT_LEGAL_MANAGEMENT": "Autorisation de créer et modifier des modèles juridiques"
 }
}
</i18n>