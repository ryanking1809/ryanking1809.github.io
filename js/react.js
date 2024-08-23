var PriceCalculator = React.createClass({
	propTypes: {
		standardPrice: React.PropTypes.number,
		adminPrice: React.PropTypes.number,
		discount: React.PropTypes.number,
	},

	getDefaultProps: function () {
		return {
			standardPrice: 15,
			adminPrice: 35,
			discount: 0.2,
		};
	},

	getInitialState: function () {
		return {
			adminUser: 1,
			standardUser: 0,
		};
	},

	updateAdmin: function (event) {
		this.setState({ adminUser: event.target.value });
	},

	updateStandard: function (event) {
		this.setState({ standardUser: event.target.value });
	},

	totalStandardPriceMonth: function () {
		return this.state.adminUser * this.props.adminPrice;
	},

	totalAdminPriceMonth: function () {
		return this.state.standardUser * this.props.standardPrice;
	},

	totalPriceMonth: function () {
		return this.totalAdminPriceMonth() + this.totalStandardPriceMonth();
	},

	render: function () {
		return (
			<div>
				<div className="calc-table">
					<table
						style={{
							display: "inline-table",
							marginBottom: 0,
							position: "relative",
							zIndex: 2,
						}}
					>
						<tbody>
							<tr>
								<td>Monthly Subscription</td>
								<td style={{ backgroundColor: "gold" }}>
									Yearly Subscription
								</td>
							</tr>
							<tr>
								<td>
									<span style={{ fontSize: "3em" }}>
										${this.totalPriceMonth()}
									</span>
									<br />
									<span className="small">per month</span>
								</td>
								<td>
									<span style={{ fontSize: "3em" }}>
										$
										{this.totalPriceMonth() *
											(1 - this.props.discount)}{" "}
									</span>
									<br />
									<span className="small">
										per month ( {this.props.discount * 100}%
										discount )
									</span>
								</td>
							</tr>
							<tr>
								<td>${this.totalPriceMonth() * 12} / year</td>
								<td>
									$
									{this.totalPriceMonth() *
										12 *
										(1 - this.props.discount)}{" "}
									/ year
								</td>
							</tr>
						</tbody>
					</table>
					<table
						style={{
							display: "inline-table",
							background: "transparent",
							boxShadow: "none",
							marginTop: 0,
							position: "relative",
							zIndex: 1,
							fontSize: ".9em",
							fontWeight: "bold",
							fontStyle: "italic",
						}}
					>
						<tbody>
							<tr>
								<td style={{ border: "none" }}></td>
								<td
									style={{
										backgroundColor: "gold",
										border: "none",
										boxShadow:
											"4px 4px 10px 0px rgba(0,0,0,0.4)",
									}}
								>
									Save $
									{this.totalPriceMonth() *
										12 *
										this.props.discount}
									!
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="user-table">
					<table style={{ display: "inline-table" }}>
						<thead>
							<tr>
								<td>
									Admin Users
									<br />
									<span className="small">
										( ${this.props.adminPrice} / month )
									</span>
								</td>
								<td>
									Standard Users
									<br />
									<span className="small">
										( ${this.props.standardPrice} / month )
									</span>
								</td>
							</tr>
							<tr>
								<td className="user-input">
									<input
										type="number"
										min="1"
										value={this.state.adminUser}
										onChange={this.updateAdmin}
									/>
									<span className="small">
										Click to edit number of users.
									</span>
								</td>
								<td className="user-input">
									<input
										type="number"
										min="0"
										value={this.state.standardUser}
										onChange={this.updateStandard}
									/>
									<span className="small">
										Click to edit number of users.
									</span>
								</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<ul>
										<li>
											Plan Business Finances &amp;
											Workload
										</li>
										<li>
											Plan Project Finances, Workload
											&amp; Schedules
										</li>
										<li>Allocate Project Resources</li>
										<li>Add Projects / Staff</li>
										<li>Create Invoices</li>
										<li>Create Reports</li>
										<li>Track Time</li>
									</ul>
								</td>
								<td>
									<ul>
										<li>
											View Project Schedules &amp;
											Milestones
										</li>
										<li>Track Allocated Project Hours</li>
										<li>Create Limited Reports</li>
										<li>Track Time</li>
									</ul>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	},
});

var SignupModal = React.createClass({
	getInitialState: function () {
		return {
			email: "",
		};
	},

	updateEmail: function (event) {
		this.setState({ email: event.target.value });
	},

	submitEmail: function (event) {
		// email me about this
		var URL =
			"https://launch.coincraft.co/#/register?email=" + this.state.email;
		window.open(URL, "_blank");
	},

	render: function () {
		return (
			<div>
				<button
					data-remodal-action="close"
					className="remodal-close"
				></button>
				<h2>Try Coincraft for Free</h2>
				<p>We first need your email address to get started.</p>
				<input
					type="email"
					placeholder="corb@corbusier.com"
					value={this.state.email}
					onChange={this.updateEmail}
				/>
				<br />
				<button
					data-remodal-action="confirm"
					className="remodal-confirm"
					onClick={this.submitEmail}
				>
					Create your Coincraft account!
				</button>
			</div>
		);
	},
});

var ContactModal = React.createClass({
	getInitialState: function () {
		return {
			email: "",
			phone: "",
			message: "",
		};
	},

	updateEmail: function (event) {
		this.setState({ email: event.target.value });
	},

	updatePhone: function (event) {
		this.setState({ phone: event.target.value });
	},

	updateMessage: function (event) {
		this.setState({ message: event.target.value });
	},

	submitMessage: function (event) {
		// email me about this
		alert(this.state.email);
		alert(this.state.phone);
		alert(this.state.message);
	},

	render: function () {
		return (
			<div>
				<button
					data-remodal-action="close"
					className="remodal-close"
				></button>
				<p className="contact-details">
					<a href="mailto:hello@coincraft.co">hello@coincraft.co</a>
				</p>
				<h2 style={{ marginTop: "0.5em" }}>Contact Us</h2>
				<p style={{ marginBottom: "3em" }}>
					Feel free to call us, email us or use the contact form
					below.
				</p>
				<div>
					<label>Email Address</label>
					<input
						type="email"
						onChange={this.updateEmail}
						placeholder="corb@corbusier.com"
					/>
				</div>
				<div>
					<label>
						Phone Number <i>(optional)</i>
					</label>
					<input
						onChange={this.updatePhone}
						type="tel"
						placeholder="0412-123-123"
					/>
				</div>
				<div>
					<label>Message </label>
					<textarea
						onChange={this.updateMessage}
						placeholder="Type your message here."
					></textarea>
				</div>
				<button
					data-remodal-action="confirm"
					className="remodal-confirm"
					onClick={this.submitMessage}
				>
					Send Message
				</button>
			</div>
		);
	},
});

React.render(<SignupModal />, $(".signup-modal")[0]);
React.render(<ContactModal />, $(".contact-modal")[0]);
