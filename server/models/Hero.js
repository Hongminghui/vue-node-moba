const mongoose = require('mongoose')

const schema = mongoose.Schema({
  name: { type: String },
  // 只保存图片地址
  avatar: { type: String },
  // 英雄的称号，比如：后羿称号半神之弓
  title: { type: String },
  // 分类，每一个英雄都有自己的分类，战士，法师等
  // 关联字段，category字段的值会是Category集合中id相同的文档
  // 新知识：一个英雄有多个分类，使用数组，这个字段会关联多个文档
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
  // 新知识：复合类型，英雄有难度，技能，攻击，生存四项评分，对象中嵌套对象
  // scores这个字段中包含四个字段
  scores: { 
    difficult: {type: Number},
    skills: {type: Number},
    attack: {type: Number},
    survive: {type: Number},
  },
  // 技能有多个，而且每个技能也有多个指标，名称图标简介等
  skills: [{
    icon: { type: String },
    name: { type: String },
    description: { type: String },
    tips: { type: String }
  }],
  // 顺风/逆风出装，多个装备用数组，每个装备都关联着装备模型，数据到时候到Item中去找
  items1: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],
  items2: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],
  // 使用技巧
  usageTips: { type: String },
  // 对抗技巧
  battleTips: { type: String },
  // 团战技巧
  teamsTips: { type: String },
  // 搭档，搭档这里有英雄和搭档的理由
  partners: [{
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    description: { type: String }
  }]
})

module.exports = mongoose.model('Hero', schema)