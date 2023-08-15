<template>
  <main class="main">
    <aside class="sidebar">
      <h1>Jitsi Test</h1>
      <label>
        <span>Домен сервера Jitsi</span>
        <input type="text" v-model="meetDomain" placeholder="meet.jit.si" />
      </label>
      <label>
        <span>Название комнаты</span>
        <input type="text" v-model="roomName" placeholder="someRandomName" />
      </label>
      <label>
        <span>Токен пользователя</span>
        <textarea
          v-model="userToken"
          placeholder="JWT"
          style="width: 300px; height: 200px"
        />
      </label>
      <label>
        <input type="checkbox" v-model="micOn" />
        <span>Вкл. микрофон при входе</span>
      </label>
      <label>
        <input type="checkbox" v-model="cameraOn" />
        <span>Вкл. камеру при входе</span>
      </label>
      <label>
        <input type="checkbox" v-model="prejoinPage" />
        <span>Вход через гостевую комнату</span>
      </label>
      <button @click="connect">Запустить</button>
    </aside>
    <article class="frame-container" ref="meetContainer"></article>
  </main>
</template>

<script lang="ts" src="./app.ts"></script>

<style lang="css" src="./app.css"></style>
