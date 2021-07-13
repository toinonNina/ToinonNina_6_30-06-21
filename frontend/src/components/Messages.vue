<template>
  <div>
    <p>Hello Zazeal !</p>
    <ul v-for="message in items" :key="message.messages">
      <li>
        {{ message.messages }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { messages: "my very" },
        { messages: "firts" },
        { messages: "Message" },
      ],
    };
  },
};
</script>
