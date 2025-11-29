/**
 * 依赖注入容器
 * 简单的依赖注入实现，用于管理模块间的依赖关系
 */

class Container {
  constructor() {
    this.services = {};
    this.singletons = {};
  }

  /**
   * 注册服务
   * @param {string} name - 服务名称
   * @param {Function} factory - 服务工厂函数
   * @param {boolean} singleton - 是否为单例模式
   */
  register(name, factory, singleton = false) {
    this.services[name] = { factory, singleton };
  }

  /**
   * 获取服务实例
   * @param {string} name - 服务名称
   * @returns {*} 服务实例
   */
  get(name) {
    const service = this.services[name];
    
    if (!service) {
      throw new Error(`Service '${name}' not registered`);
    }
    
    if (service.singleton) {
      if (!this.singletons[name]) {
        this.singletons[name] = service.factory(this);
      }
      return this.singletons[name];
    }
    
    return service.factory(this);
  }
}

// 创建全局容器实例
export const container = new Container();