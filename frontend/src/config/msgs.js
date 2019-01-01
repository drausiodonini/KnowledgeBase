import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
	iconPack: 'fontawesome',
	duration: 3000
})

Vue.toasted.register(
	'defaultSuccess',
	data => !data.msg ? 'Operação realizada com sucesso' : data.msg,
	{ type: 'success', icon: 'check' }
)

Vue.toasted.register(
	'defaultError',
	data => !data.msg ? 'Ops! Erro inisperado' : data.msg,
	{ type: 'error', icon: 'times' }
)

