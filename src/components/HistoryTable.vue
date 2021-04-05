<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Сумма</th>
      <th>Дата</th>
      <th>Категория</th>
      <th>Тип</th>
      <th>Открыть</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, index) in records" :key="record.ref">
      <td>{{index + 1}}</td>
      <td>{{record.amount | currency('RUB')}}</td>
      <td>{{record.date | date('datetime')}}</td>
      <td>{{record.categoryName}}</td>
      <td>
        <span class="white-text badge" :class="record.typeClass">{{record.typeText}}</span>
      </td>
      <td>
        <button v-tooltip="`Перейти на описание`" class="btn-small btn" @click="$router.push(`/details-record/${record.ref}`)">
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'historyTable',

  props: {
    records: {
      type: Array,
      required: true
    }
  },
}
</script>