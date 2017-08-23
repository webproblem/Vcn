var Vcn = function(obj){
	this.$el = document.querySelector(obj.el);
	this.$options = obj;
	this._data = {};
	this.init();
}

Vcn.prototype = {
	init: function(){
		var that = this;
		that.getTemplate();
		that.watch();
	},
	getTemplate: function(){
        this.template = this.$el.innerHTML;    
    },
	watch: function(){
		var that = this,
		    data = that.$options.data,
		    keys = Object.keys(data);
		keys.map(function(item){
			Object.defineProperty(that, item, {
				enumberable: true,
				configurable: true,
				get: function(){
					return that._data[item]
				},
				set: function(value){
					if(that[item] === value){
						return;
					}
					that._data[item] = value;
					that.update();
				}
			})
			that[item] = data[item];
		})    
	},
	update: function(){
		var that = this,
            template = that.template,
            reg = /(.*?)\{\{(\w*)\}\}/g,
            result = '';
        result = template.replace(reg, function(rs, $1, $2){
            var val = that[$2] || '';
            return $1 + val;
        });
        this.$el.innerHTML = result; 
        console.log("updated");
	}


};

