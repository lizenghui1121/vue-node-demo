<template>
  <el-container style="height: 100vh;">
    <el-aside width="180px" style="background-color: rgb(238, 241, 246)" class="hidden-xs-only">
      <el-menu router unique-opened :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>英雄管理
          </template>
          <el-menu-item-group>
            <template slot="title">物品</template>
            <el-menu-item index="/items/create">新建物品</el-menu-item>
            <el-menu-item index="/items/list">物品列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">英雄</template>
            <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
            <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">召唤师技能</template>
            <el-menu-item index="/skills/create">新建技能</el-menu-item>
            <el-menu-item index="/skills/list">技能列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">铭文</template>
            <el-menu-item index="/mingwens/create">新建铭文</el-menu-item>
            <el-menu-item index="/mingwens/list">铭文列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-message"></i>内容管理
          </template>
          <el-menu-item-group>
            <template slot="title">文章</template>
            <el-menu-item index="/articles/create">新建文章</el-menu-item>
            <el-menu-item index="/articles/list">文章列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">视频</template>
            <el-menu-item index="/videos/create">新建视频</el-menu-item>
            <el-menu-item index="/videos/list">视频列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">攻略</template>
            <el-menu-item index="/strategies/create">新建攻略</el-menu-item>
            <el-menu-item index="/strategies/list">攻略列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-message"></i>运营管理
          </template>
          <el-menu-item-group>
            <template slot="title">广告位</template>
            <el-menu-item index="/ads/create">新建广告位</el-menu-item>
            <el-menu-item index="/ads/list">广告位列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-message"></i>系统设置
          </template>
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">管理员</template>
            <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
            <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="font-size: 14px; padding-right:20px;">
        <el-row
          type="flex"
          style="flex-direction: row-reverse;"
          justify="space-between"
          align="middle"
        >
          <div>
            <span>
              欢迎你，
              <span style="color:#409EFF;">{{currentUser}}</span>
            </span>
            <el-dropdown @command="handleCommand">
              <i class="el-icon-user-solid" style="margin-left: 8px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="userEdit">
                  <i class="el-icon-setting" style="margin-right: 8px"></i>修改密码
                </el-dropdown-item>
                <el-dropdown-item command="exit">
                  <i class="el-icon-delete" style="margin-right: 8px"></i>退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <i class="el-icon-menu hidden-sm-and-up" @click="drawer=!drawer"></i>
        </el-row>
      </el-header>

      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
    <el-drawer size="180" :visible.sync="drawer" direction="ltr" style="width:500px;">
      <el-menu router unique-opened :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>英雄管理
          </template>
          <el-menu-item-group>
            <template slot="title">物品</template>
            <el-menu-item index="/items/create">新建物品</el-menu-item>
            <el-menu-item index="/items/list">物品列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">英雄</template>
            <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
            <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">召唤师技能</template>
            <el-menu-item index="/skills/create">新建技能</el-menu-item>
            <el-menu-item index="/skills/list">技能列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">铭文</template>
            <el-menu-item index="/mingwens/create">新建铭文</el-menu-item>
            <el-menu-item index="/mingwens/list">铭文列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-message"></i>内容管理
          </template>
          <el-menu-item-group>
            <template slot="title">文章</template>
            <el-menu-item index="/articles/create">新建文章</el-menu-item>
            <el-menu-item index="/articles/list">文章列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">视频</template>
            <el-menu-item index="/videos/create">新建视频</el-menu-item>
            <el-menu-item index="/videos/list">视频列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">攻略</template>
            <el-menu-item index="/strategies/create">新建攻略</el-menu-item>
            <el-menu-item index="/strategies/list">攻略列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-message"></i>运营管理
          </template>
          <el-menu-item-group>
            <template slot="title">广告位</template>
            <el-menu-item index="/ads/create">新建广告位</el-menu-item>
            <el-menu-item index="/ads/list">广告位列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-message"></i>系统设置
          </template>
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">管理员</template>
            <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
            <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-drawer>
  </el-container>
</template>

  


<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item),
      drawer: false
    };
  },
  computed: {
    currentUser() {
      return localStorage.currentUser;
    },
    userId() {
      return localStorage.userId;
    }
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "userEdit":
          console.log(this.userId);
          this.$router.push(`/admin_users/edit/${this.userId}`);
          break;
        case "exit":
          localStorage.clear();
          this.$router.push("/login");
          break;
      }
    }
  },
  mounted() {
    this.$router.push("/items/list");
  }
};
</script>