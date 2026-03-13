<script setup>
import { ref, onMounted } from 'vue'

const books = ref([])
const users = ref([])
const loading = ref(true)
const activeTab = ref('books')

const API_BASE = 'http://localhost:8081/api'

const fetchData = async () => {
  loading.value = true
  try {
    const [booksRes, usersRes] = await Promise.all([
      fetch(`${API_BASE}/books`),
      fetch(`${API_BASE}/users`)
    ])
    books.value = await booksRes.json()
    users.value = await usersRes.json()
  } catch (error) {
    console.error('获取数据失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="container">
    <header class="header">
      <h1>CampusBook 校园图书交易平台</h1>
      <p>让闲置图书流动起来，共享知识的力量</p>
    </header>

    <nav class="tabs">
      <button 
        :class="['tab', { active: activeTab === 'books' }]"
        @click="activeTab = 'books'"
      >
        图书列表
      </button>
      <button 
        :class="['tab', { active: activeTab === 'users' }]"
        @click="activeTab = 'users'"
      >
        用户列表
      </button>
    </nav>

    <main class="content">
      <div v-if="loading" class="loading">
        加载中...
      </div>

      <div v-else-if="activeTab === 'books'" class="books-grid">
        <div v-for="book in books" :key="book.id" class="card book-card">
          <div class="card-header">
            <h3>{{ book.title }}</h3>
            <span class="price">¥{{ book.price }}</span>
          </div>
          <div class="card-body">
            <p><strong>作者:</strong> {{ book.author || '未知' }}</p>
            <p><strong>出版社:</strong> {{ book.publisher || '未知' }}</p>
            <p><strong>原价:</strong> <del>¥{{ book.originalPrice || '未知' }}</del></p>
            <p><strong>成色:</strong> {{ book.conditionLevel }}/10</p>
            <p><strong>描述:</strong> {{ book.description || '暂无描述' }}</p>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary">立即购买</button>
            <button class="btn btn-secondary">加入购物车</button>
          </div>
        </div>
        <div v-if="books.length === 0" class="empty">
          暂无图书数据
        </div>
      </div>

      <div v-else class="users-list">
        <div v-for="user in users" :key="user.id" class="card user-card">
          <div class="user-avatar">
            {{ user.username.charAt(0).toUpperCase() }}
          </div>
          <div class="user-info">
            <h3>{{ user.username }}</h3>
            <p><strong>学号:</strong> {{ user.studentId || '未设置' }}</p>
            <p><strong>信用分:</strong> 
              <span :class="['credit', { high: user.creditScore >= 80, low: user.creditScore < 60 }]">
                {{ user.creditScore }}
              </span>
            </p>
            <p><strong>状态:</strong> 
              <span :class="['status', user.status === 1 ? 'active' : 'inactive']">
                {{ user.status === 1 ? '正常' : '禁用' }}
              </span>
            </p>
          </div>
        </div>
        <div v-if="users.length === 0" class="empty">
          暂无用户数据
        </div>
      </div>
    </main>

    <footer class="footer">
      <p>CampusBook 校园图书交易平台 &copy; 2026</p>
      <p>后端服务: Spring Boot | 前端框架: Vue 3</p>
    </footer>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
}

.header {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 30px;
}

.header h1 {
  margin: 0 0 10px 0;
  font-size: 2.5em;
}

.header p {
  margin: 0;
  opacity: 0.9;
  font-size: 1.1em;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.tab {
  padding: 12px 24px;
  border: none;
  background: #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;
}

.tab:hover {
  background: #e0e0e0;
}

.tab.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.content {
  min-height: 400px;
}

.loading {
  text-align: center;
  padding: 60px;
  color: #666;
  font-size: 18px;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.book-card .card-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.book-card .card-header h3 {
  margin: 0;
  font-size: 1.2em;
}

.price {
  font-size: 1.5em;
  font-weight: bold;
}

.card-body {
  padding: 20px;
}

.card-body p {
  margin: 8px 0;
  color: #555;
}

.card-footer {
  padding: 15px 20px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-secondary {
  background: #f0f0f0;
  color: #333;
}

.btn-secondary:hover {
  background: #e0e0e0;
}

.users-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.user-card {
  display: flex;
  align-items: center;
  padding: 20px;
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  margin-right: 20px;
}

.user-info h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.user-info p {
  margin: 5px 0;
  color: #666;
  font-size: 14px;
}

.credit {
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: bold;
}

.credit.high {
  background: #e8f5e9;
  color: #2e7d32;
}

.credit.low {
  background: #ffebee;
  color: #c62828;
}

.status {
  padding: 2px 8px;
  border-radius: 4px;
}

.status.active {
  background: #e8f5e9;
  color: #2e7d32;
}

.status.inactive {
  background: #ffebee;
  color: #c62828;
}

.empty {
  text-align: center;
  padding: 60px;
  color: #999;
  font-size: 16px;
}

.footer {
  text-align: center;
  padding: 30px;
  margin-top: 40px;
  border-top: 1px solid #eee;
  color: #666;
}

.footer p {
  margin: 5px 0;
}
</style>
