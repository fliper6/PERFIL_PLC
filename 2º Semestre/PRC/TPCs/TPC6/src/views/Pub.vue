<template>
  <ConsultaPub :idr="$route.params.idPub"/>
</template>

<script>
import ConsultaPub from "@/components/ConsultaPub.vue";

export default {
  components: {
    ConsultaPub
  }
};
</script>