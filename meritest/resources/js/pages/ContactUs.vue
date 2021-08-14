<template>
	<div>

		<breadcrumb :pageTitle="'Contact Us'"></breadcrumb>
		<div class="contact-page-wrapper">
				
			<div class="container">
				
				<div class="contact-map">
				
					<div class="row">
					
						<div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
						
							<div class="section-title">
								<h2 class="text-center">Contact us for help</h2>
								<p>This will help us AND you to create a dynamic product that will completely yours. <strong>Let us know your Feedback </strong> if you have any, to improve us.</p>
							</div>
						</div>
					
					</div>
					
					<div class="row">

						<div class="col-sm-7 col-md-6 col-md-offset-1 mb-30">
						
							<form class="contact-form-wrapper" data-toggle="validator" @submit.prevent="submitForm">
							
								<div class="row">
								
									<div class="col-sm-6">
									
										<div class="form-group" :class="{ 'has-error': submitted && v$.name.$error }">
											<label for="name">Name <span class="font10 text-danger">*</span></label>
											<input id="name" 
													type="text" 
													class="form-control" 
													data-error="Your name is required" 
													v-model.trim="data.name"
													placeholder="Your name"
													>
											<span v-if="submitted && v$.name.$error" class="help-block with-errors">
												{{ v$.name.$errors[0].$message }}
											</span>
										</div>
										
									</div>
									
									<div class="col-sm-6">
									
										<div class="form-group" :class="{ 'has-error': submitted && v$.email.$error }">
											<label for="email">Email <span class="font10 text-danger">*</span></label>
											<input id="email" 
													type="email" 
													class="form-control" 
													v-model.trim="data.email"
													placeholder="Your email address">
											<span v-if="submitted && v$.email.$error" class="help-block with-errors">
												{{ v$.email.$errors[0].$message }}
											</span>
										</div>
										
									</div>

									<div class="col-sm-6">
									
										<div class="form-group" :class="{ 'has-error': submitted && v$.mobile_no.$error }">
											<label for="mobile_number">Mobile Number <span class="font10 text-danger">*</span></label>
											<input id="mobile_number" 
													type="text" 
													class="form-control" 
													placeholder="Your mobile number" 
													v-model.trim="data.mobile_no">
											<span v-if="submitted && v$.mobile_no.$error" class="help-block with-errors">
												{{ v$.mobile_no.$errors[0].$message }}
											</span>
										</div>
										
									</div>
									
									<div class="col-sm-6">
									
										<div class="form-group" :class="{ 'has-error': submitted && v$.address.$error }">
											<label for="address">Address <span class="font10 text-danger">*</span></label>
											<textarea id="address" 
														class="form-control" 
														rows="2" 
														data-minlength="4" 
														placeholder="Your address" 
														v-model.trim="data.address"></textarea>
											<span v-if="submitted && v$.address.$error" class="help-block with-errors">
												{{ v$.address.$errors[0].$message }}
											</span>
										</div>
										
									</div>
									
									
									<div class="col-sm-12">
									
										<div class="form-group" :class="{ 'has-error': submitted && v$.heard_from.$error }">
											<label for="heard-from">Heard From <span class="font10 text-danger">*</span></label>
											
											<select id="heard-from" 
													class="form-control select2"
													v-model="data.heard_from">
												<option value="">Select from where you heard about us</option>
												<option value="google">Google</option>
												<option value="facebook">Facebook</option>
												<option value="twitter">Twitter</option>
												<option value="sms">Mobile SMS</option>
												<option value="executive">Marketing Executive</option>
												<option value="friends">Friends</option>
												<option value="mobile">Mobile Application</option>
												<option value="others">Others</option>
											</select>
											<span v-if="submitted && v$.heard_from.$error" class="help-block with-errors">
												{{ v$.heard_from.$errors[0].$message }}
											</span>
										</div>
										
									</div>
									<div class="col-sm-12">
									
										<div class="form-group" :class="{ 'has-error': submitted && v$.subject.$error }">
											<label for="subject">Subject <span class="font10 text-danger">*</span></label>
											<input id="subject"
													type="text" 
													class="form-control"
													v-model.trim="data.subject"
													placeholder="Your subject" 
													/>
											<span v-if="submitted && v$.subject.$error" class="help-block with-errors">
												{{ v$.subject.$errors[0].$message }}
											</span>
										</div>
										
									</div>
									
									<div class="col-sm-12">
									
										<div class="form-group" :class="{ 'has-error': submitted && v$.message.$error }">
											<label for="message">Message <span class="font10 text-danger">*</span></label>
											<textarea id="message" 
														class="form-control" 
														rows="8" 
														data-minlength="50" 
														placeholder="Your message" 
														v-model.trim="data.message"></textarea>
											<span v-if="submitted && v$.message.$error" class="help-block with-errors">
												{{ v$.message.$errors[0].$message }}
											</span>
										</div>

									</div>
									
									<div class="col-sm-12">
										<button type="submit" class="btn btn-primary mt-5" :disabled="loading">Send Message</button>
									</div>
									
								</div>
								
							</form>
							
						</div>
						
						<div class="col-sm-5 col-md-4">
						
							<ul class="address-list">
								<li>
										<h5>Address</h5>
										<address> Plot No 09, Vidya Nagar Wathoda Layout<br />
												Behind Ganesh Mandir<br />
												NAGPUR, MAHARASHTRA 440009<br />
												India </address>
								</li>
								<li>
										<h5>Email</h5><a href="mailto:support@meritest.in">support@meritest.in</a>
								</li>
								<li>
										<h5>Phone Number</h5><a href="#">+91 762 009 8848</a>
								</li>
								<li>
										<h5>Social Networks</h5>
										<div class="contact-social">
											<a href="https://www.facebook.com/meritestdotin" target="_blank" data-toggle="tooltip" data-placement="top" title="Facebook"><i class="fa fa-facebook-official"></i></a>
											<a href="https://twitter.com/meritestdotin" target="_blank" data-toggle="tooltip" data-placement="top" title="Twitter"><i class="fa fa-twitter"></i></a>
											<a href="https://www.linkedin.com/in/meritestdotin" target="_blank" data-toggle="tooltip" data-placement="top" title="LinkedIn"><i class="fa fa-linkedin "></i></a>
											<a href="https://www.pinterest.com/meritestdotin" target="_blank" data-toggle="tooltip" data-placement="top" title="Pintrest"><i class="fa fa-pinterest "></i></a>
											<a href="https://www.quora.com/profile/meritestdotin" target="_blank" data-toggle="tooltip" data-placement="top" title="Quora"><i class="fa fa-quora "></i>Q</a>
											<a href="https://medium.com/" target="_blank" data-toggle="tooltip" data-placement="top" title="Medium"><i class="fa fa-medium "></i></a>
											<a href="https://www.youtube.com/channel/UC2jXBWiTxsr-KQlBexxPvXA" target="_blank" data-toggle="tooltip" data-placement="top" title="Youtube"><i class="fa fa-youtube "></i></a>
										</div>
								</li>
									
							</ul>
						
						</div>
						
					</div>
				
				</div>

			</div>
			
		</div>
	</div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
import useVuelidate from '@vuelidate/core';

import { required, email, maxLength, minLength, numeric, helpers } from '@vuelidate/validators';
import axios from "axios";
import { load } from 'recaptcha-v3';

export default {
	setup () {
		const submitted = ref(false);
		const loading = ref(false);

		const data = reactive({
            name: '',
            email: '',
            mobile_no: null,
			address: '',
			heard_from: '',
			subject: '',
			message: '',
			recaptcha_token: '',
        });
		const rules = computed(() => {
            return {
                name: {
                    required: helpers.withMessage('Please enter your name.', required),
                },
                email: {
                    required: helpers.withMessage('Please enter your email address.', required),
                    email: helpers.withMessage('Please enter valid email address.', email),
                },
                mobile_no: {
                    required: helpers.withMessage('Please enter your mobile number.', required),
                    numeric,
                    maxLength: maxLength(10),
                    minLength: minLength(8)
                },
                address: {
                    required: helpers.withMessage('Please enter your address.', required),
                },
                heard_from: {
                    required: helpers.withMessage('Please select from where you heard about us.', required),
                },
                subject: {
                    required: helpers.withMessage('Please enter subject.', required),
                },
                message: {
                    required: helpers.withMessage('Please enter your message.', required),
                },
            }
        });

        const v$ = useVuelidate (rules, data);
		
		asyncFunction();

		async function asyncFunction() {
			const recaptcha = await load('6LfL6wAVAAAAAFvQtjwR1gpXwz-u3D25KPpTNN3Q');
			const token = await recaptcha.execute('/api/contactus');

			data.recaptcha_token = token;
			var thingToShow = document.querySelectorAll(".grecaptcha-badge")[0];
			thingToShow.parentNode.classList.remove("hidden");
		}

		function submitForm() {
			submitted.value = true;
			
			v$.value.$validate(); // checks all inputs

			if (!v$.value.$error) {
				
				loading.value = true;

				saveContact();
				
            } else {
                // if ANY fail validation
                
                return ;
            }
		}

		
		async function saveContact()
		{
			await axios.post('/api/contactus', data)
				.then(response => {
					if (response.data.success == true) {
						alert(response.data.message);
					} else {
						alert(response.data.message);
						
					}
				})
				.catch(e => {
					alert('You will be contacted soon.');
					console.log('Oops, something went wrong!');
				}) ;
				loading.value = false;
				submitted.value = false;
				location.reload();
				clearForm();
		}
		function clearForm()
		{
			 data.name = '';
			 data.email = '';
			 data.mobile_no = null;
			 data.address = '';
			 data.heard_from = '';
			 data.subject = '';
			 data.message = '';
		}

		return { 
			v$,
			submitForm,
			submitted,
			loading,
			data,
			clearForm,
			asyncFunction
		 }
	},
	beforeRouteLeave (to, from, next) {
		var thingToHide = document.querySelectorAll(".grecaptcha-badge")[0];
		thingToHide.parentNode.classList.add("hidden");
		next();
	}
}
</script>