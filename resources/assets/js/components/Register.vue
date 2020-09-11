<template>
	<div class="card">
		<div class="card-body">
			<form
			  id="register"
			  @submit="checkForm"
			  action="register"
			  method="post">
				<input type="hidden" name="_token" :value="csrf">

				<div class="row">
					<h4>Register</h4>
				</div> 

			  	<div class="row">
					<select id="assign" class="form-control" required autocomplete="off" @change="positionChanged">
						<option v-for="position in form.positions" :selected="form.selectedPosition == position">{{ position }}</option>
					</select>
				</div>

				<div class="row">
					<input v-model="form.nameOfCompany" type="text" id="nameofcompany" class="form-control" placeholder="Name of Company" required autocomplete="off" name="first_name">
				</div>

				<div class="row">
					<input v-model="form.nameOfApplicant" type="text" id="nameofapplicant" class="form-control" placeholder="Name of Applicant/Personel" required autocomplete="off" name="last_name">
				</div>

				<div class="row">
					<input v-model="form.mobile" type="number" id="contact" class="form-control" placeholder="Mobile Phone Number" required autocomplete="off">
				</div>

				<div class="row">
					<input v-model="form.email" id="email" type="email" class="form-control" name="email" required placeholder="Official Email Address" autocomplete="off">
				</div>

				<div class="row">
					<input v-model="form.usernamae" id="name" type="text" class="form-control" name="name" required placeholder="Username" autocomplete="off">
				</div>

				<div class="row">
					<input id="password" :type="form.showPassword ? 'text' : 'password'" class="form-control" name="password" required v-model="form.password" placeholder="Password" @keyup="validatePassword">

					<input v-model="form.checkPassword" id="password-confirm" :type="form.showPassword ? 'text' : 'password'" class="form-control" name="password_confirmation" required placeholder="Confirm Password">

					<div class="custom-control custom-checkbox">
						<input :click="showPassword" type="checkbox" name="show_password" class="custom-control-input" id="showpassword" v-model="form.showPassword">
						<label class="custom-control-label" for="showpassword">Show Password</label>
					</div>
				</div>


				<div>
					<span class="text-warning">Password must have all of the following</span>
					<ul>
						<li v-for="rule in passwordRules" :class="rule.validated ? 'text-success' : 'text-danger'">{{ rule.message }}</li>
					</ul>
				</div>

				<div>
					<button type="submit" class="btn btn-lg btn-google btn-block text-uppercase">Register</button>
				</div>
			  </form>
		</div>
	</div>
</template>

<script>
	export default {
		created() {
			const storedForm = this.openStorage();

			if (storedForm) {
				this.form = {
					...this.form,
					...storedForm
				}

				this.clearPasswords();
			}
		},
		data() {
			return {
				form: {
					positions: ['President', 'Owner', 'Head of Facility'],
					nameOfCompany: '',
					nameOfApplicant: '',
					mobile: '',
					email: '',
					username: '',
					password: '',
					checkPassword: '',
					showPassword: false,
					selectedPosition: 'President',
					
				},
				csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
				passwordRules: [{
					message: "10 to 32 characters in length",
					regex: /.{10,32}/,
					validated: false
				}, {
					message: "Upper Case",
					regex: /[A-Z]+/,
					validated: false
				}, {
					message: "Lower Case",
					regex: /[a-z]+/,
					validated: false
				}, {
					message: "Number",
					regex: /[0-9]+/,
					validated: false
				}, {
					message: "Symbol ( = ? < > @ # $ * ! )",
					regex: /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
					validated: false
				}, {
					message: "Should not be the same as your Username",
					regex: null,
					validated: false,
					// args: {
					// 	password: this.form.password,
					// 	username: this.form.username
					// },
					// validator: function (args) {
					// 	return args.password.localeCompare(args.username) != 0;
					// }
					validator: function (username, password) {
						return password.localeCompare(username) != 0;
					}
				}/**, {
					message: "Password and Confirm Password must match",
					regex: null, 
					validated: false,
					args: {
						password: this.form.password,
						confirmPassword: this.form.confirmPassword
					},
					validator: function (args) {
						return args.password.localeCompare(args.confirmPassword) == 0;
					}
				}**/]
			}
		},
		computed: {
			submitOk() {
				let nonEmpty = [nameOfCompany, nameOfApplicant, mobile, email];

				for (let rule of this.passwordRules) {
					if (!rule.validated) {
						return false;
					}
				}

				for (let t of this.nonEmpty) {
					if (t.length == 0) {
						return false;
					}
				}

				return true;
			}
		},
		methods: {
			validatePassword(event) {
				for (let rule of this.passwordRules) {

					if (rule.regex != null) {
						if (rule.regex.test(this.form.password)) {
							rule.validated = true;
						} else {
							rule.validated = false;
						}
					} else {
						rule.validated = rule.validator(this.form.username, this.form.password);
						// rule.validated = rule.validator(rule.args);
					}
				}
			},

			checkForm(e) {
				let password = document.getElementById('password');
				this.errors = [];

				for (let rule of this.passwordRules) {
					if (!rule.validated) {
						this.errors.push(rule.message);
						password.focus();
						break;
					}
				}

				// save input data to local storage
				this.saveStorage(this.form);

				if (!this.errors.length) {
					return true;
				}

				e.preventDefault();
			},

			showPassword() {
				// this.form.showPassword = !this.form.showPassword;
			},

			clearPasswords() {
				if (this.form) {
					this.form.password = "";
					this.form.checkPassword = "";
				}
			},

			positionChanged(event) {
				this.form.selectedPosition = event.target.value;
			},

			openStorage () {
		      return JSON.parse(localStorage.getItem('form'))
		    },

		    saveStorage (form) {
		      localStorage.setItem('form', JSON.stringify(form))
		    },
		}
	}
</script>