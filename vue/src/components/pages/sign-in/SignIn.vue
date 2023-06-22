<template>
  <div class="w-full">
    <CrudForm
      btn-text="Sign in"
      title="Sign in"
      :fields="fields"
      :validation-schema="signInSchema"
      @on-submit="handleSubmit"
    />
    <p>You don't have an account yet?
      <RouterLink :to="AppRoutes.SIGN_UP">sign up</RouterLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { fields } from  './data';
import { signInSchema } from '@validation-schemas/index';
import { useAuthStore } from '@/stores/auth';
import { SignInDto } from '@types-app/auth';
import { AppRoutes } from '@enums/route';
import CrudForm from '@common/crud-form/CrudForm.vue';

const authSotre = useAuthStore();

const handleSubmit = (values: SignInDto) => authSotre.signIn(values);
</script>