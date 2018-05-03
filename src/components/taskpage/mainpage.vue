<template>
   <div class="layout">
        <Layout>
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="48" v-model="isCollapsed">
                <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                    <router-link to="/mainpage/homepage">
                        <MenuItem name="1-1">
                            <Icon type="ios-home"></Icon>
                            <span>首页</span>
                        </MenuItem>
                    </router-link>
                    <router-link to="/mainpage/assetSet">
                        <MenuItem name="1-1">
                            <Icon type="android-radio-button-on" ></Icon>
                            <span>任务调度</span>
                        </MenuItem>
                    </router-link>
                    <router-link  to="/mainpage/leaks">
                        <MenuItem name="1-2">
                            <Icon type="bug"></Icon>
                            <span>漏洞列表</span>
                        </MenuItem>
                    </router-link>
                    <router-link  to="/mainpage/assetsManage">
                        <MenuItem name="1-3">
                            <Icon type="podium"></Icon>
                            <span>资产风险分布</span>
                        </MenuItem>
                    </router-link>
                    <router-link  to="/mainpage/assetManagement">
                        <MenuItem name="1-4">
                            <Icon type="ios-list-outline"></Icon>
                            <span>资产码头</span>
                        </MenuItem>
                    </router-link>
                    <router-link to="/mainpage/kbinfo">
                        <MenuItem name="1-5">
                            <Icon type="social-dropbox"></Icon>
                            <span>知识库</span>        
                        </MenuItem>
                    </router-link>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '5px 10px 0'}" type="navicon-round" size="20"></Icon>
                </Header>
                <Content :style="{ background: '#fff', minHeight: '906px'}">
                    <router-view :key="key"></router-view> 
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                key: Date.now(),
                isCollapsed: false
            }
        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        methods: {
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            }
        }
    }
</script>

<style scoped>
.ivu-menu-item>i{
    margin-right:0px;
}
    .ivu-layout-header{
        height: 30px;
        line-height: 30px;
    }
    .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title{
        padding:14px 14px 14px 10px;
    }

    .layout{
        /* border: 1px solid #d7dde4; */
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .ivu-layout-sider{
        max-width: 99px;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        /* width: 69px; */
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>
