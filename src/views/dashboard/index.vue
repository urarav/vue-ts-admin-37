<script setup lang="ts"></script>

<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="8" v-for="i in 6" :key="i">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>Card name</span>
              <el-button class="button" text>Operation button</el-button>
            </div>
          </template>
          <div v-for="o in 4" :key="o" class="text item">
            {{ "List item " + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  padding: 10px;
  .el-col {
    margin-bottom: 20px;
  }
}
</style>
