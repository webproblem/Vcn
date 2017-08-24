function Mvvm(options) {
	this.$options = options;
	var data = this._data = this.$options.data;
	var that = this;
	Object.keys(data).forEach(function(key){
		that._proxy(key);
	})
}

Mvvm.prototype = {
	_proxy: function(key){
		var that = this;
		Object.defineProperty(that, key, {
			configurable: false,
			enumberable: true,
			get: function(){
				return that._data[key];
			},
			set: function(newVal){
				that._data[key] = newVal;
			}
		})
	}
};

window.Vcn = Mvvm;
