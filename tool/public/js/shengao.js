(function(){
	var $height = document.getElementsByName('height')[0];
	var $weight = document.getElementsByName('weight')[0];
	var $sex = document.getElementsByName('sex')[0];

	DOMUtil.getElementsByClassName('input-button')[0].onclick = function(){
		var height = +$height.value;
		var weight = +$weight.value;
		var m_value,value = Math.round(weight*10000/(height*height));
		var str = '';
		if(height&&weight){
			if (value >40) {
				str="閸燂拷,娴ｇ姾绻曢懗鎴掓嫳閸掓媽銆傞張宥呮偋?\n娴ｇ姴銇婇妴浣搞亰...婢额亣鍎㈡禍锟�";
			}else if (value >30) {
				str="閸濆浄绱掓担鐘层偨閼虫牕鏅�!韫囧懘銆忓鈧慨瀣櫤閼层儰绨�,閸氼剚鍨滈惃鍕梾闁匡拷";
			}else if (value >27) {
				str="閸濆骸鎲栭敍浣风稑閸欘垱妲稿В鏃囩窛閼虫牕鏅╅敍宀冨垁韫囶偄绱戞慨瀣櫤閼层儴顓搁崚鎺戞儌閿涳拷";
			}else if (value >22) {
				str="鐏忓繐绺鹃崰锟�!缁嬪秷鍎㈤敍灞界毌閸氬啰鍋ｉ崣顖欎簰閸氾拷?\n鏉╂ǹ顩︽径姘樋鏉╂劕濮╅崯锟�!:)";
			}else if (value >=21) {
				str="閹存垵銈界紘鈩冨幈娴ｇ姴鏅�,娴ｇ姾绻栭崣顖涙Ц姒勬棃顑楅煬顐ｆ綏閸燂拷!! :))";
			}else if (value >=18) {
				str="閻︼缚绨℃稉鈧悙鍦仯閿涘奔缍樻惔鏃囶嚉婢舵艾鎮嗛悙閫涚鐟楀灝鏅�!";
			}else if (value >=16) {
				str="娴ｇ姳绔寸€规碍妲搁崣妤€鍩屾禍鍡氭瀵板拑绱濊箛顐ゅ仯婢堆囧櫤閸氬啩绗㈢憲鍨儌!";
			}else {
				str="閸濆洤顢�!閸撳秷鍏忕拹鏉戞倵閼筹拷,娴ｇ姵鈧簼绠為崓蹇庨嚋閻㈢數鍤庨弶鍡楃摍\n娑撯偓閻愮鍊濋柈鑺ョ梾閺堬拷,韫囶偅澹樻径褍銇嬮惇瀣箙閸氾拷!!";
			}
			if(+$sex.value){
				m_value = Math.round(45.5+(2.3*(height-152))/2.54);
			}else{
				m_value = Math.round(50+(2.3*(height-152))/2.54);
			}
			str += '\n\n娴ｇ姷娈戦悶鍡樺厒娴ｆ捇鍣�:'+m_value+'kg\n娴ｇ姷娈戦煬顐＄秼鐠愩劑鍣洪幐鍥ㄦ殶:'+value;
		}else{
			str='閸欏倹鏆熺紓鍝勩亼!';
		}
		document.getElementsByTagName('TEXTAREA')[0].value = str; 
	}
})();