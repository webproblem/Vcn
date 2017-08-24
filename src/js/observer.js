function Observer(data){
	this.data = data;
	this.walk();
}
Observer.prototype = {
	walk: function(){
		var data = this.data;
		Object.keys(data).forEach(function(key){
			this.convert(key, data[key]);
		})
	},
	convert: function(key, val){
		this.defineReactive(key, val);
	},
	defineReactive: function(key, val){
		var that = this;
		Object.defineProperty(that.data,key,{
			enumberable: true,
			configurable: false,
			get: function(){
				return val;
			},
			set: function(newVal){
				that.data[key] = newVal;
			}
		})
	},
	update: function(){}
}