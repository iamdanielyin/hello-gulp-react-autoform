/**
 * 测试数据
 * Created by yinfxs on 16-5-27.
 */

exports = {
    code: {type: String, label: '编码'},
    name: {type: String, required: true, sname: '名称'},
    remark: {type: String, sname: '备注'},
    created: {type: String, sname: '创建时间'},
    img: {type: String, sname: '单图'},
    imgs: [{type: String, sname: '多图'}],
    senum: {type: String, enum: ['单枚举值1', '单枚举值2', '单枚举值3', '单枚举值4', '单枚举值5'], sname: '单枚举'},
    senums: [{type: String, enum: ['多枚举值1', '多枚举值2', '多枚举值3', '多枚举值4', '多枚举值5'], sname: '多枚举'}],
    sref: {type: Schema.Types.ObjectId, ref: 'Users', sname: '单引用'},
    srefs: [{type: Schema.Types.ObjectId, ref: 'Users', sname: '多引用'}],
    num: {type: Number, sname: '数字'},
    bool: {type: Boolean, sname: '布尔'},
    date: {type: String, sname: '日期'},
    time: {type: String, sname: '时间'}
};