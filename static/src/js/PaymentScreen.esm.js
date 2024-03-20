/** @odoo-module **/

import PaymentScreen from "point_of_sale.PaymentScreen";
import Registries from "point_of_sale.Registries";

export const PaymentScreenRisk = (PaymentScreen) =>
	class PaymentScreenRisk extends PaymentScreen {
		setup() {
			super.setup();
			this.paymentMethodsFromConfigBase = this.payment_methods_from_config;
			this.paymentMethodsUnlock = [];
			this.paymentMethodsLock = [];
			// this.updateCreditPaymentMethod();
			this.updateCashPaymentMethod();
		}

		async _onClickPay() {
            await super._onClickPay()
            await this.updateCashPaymentMethod()
        }

		// async selectPartner() {
		// 	await super.selectPartner();
		// 	await this.updateCreditPaymentMethod();
		// }

		updateCreditPaymentMethod() {
			const order = this.currentOrder;
			const partner = order.partner;

			if(!partner)
			{
				this.paymentMethodsUnlock = this.paymentMethodsFromConfigBase;
				this.paymentMethodsLock = [];
				this.render(true);
				return;
			}

			const paymentCreditLimit = this.env.pos.config.payment_credit_limit_restricted_ids;
			const orderTotal = order.get_total_with_tax() + order.get_rounding_applied();
			
			this.rpc({
				model: "res.partner",
				method: "read",
				args: [
					partner.id,
					["credit_limit"],
				],
			}).then((partnerFields) => {
				const creditLimit = partnerFields[0].credit_limit;

				if (creditLimit > 0){
					if (paymentCreditLimit.length > 0){
						this.paymentMethodsUnlock = this.paymentMethodsFromConfigBase.filter(
							(method) => !paymentCreditLimit.includes(method.id)
						);						
					} else {
						this.paymentMethodsUnlock = this.paymentMethodsFromConfigBase.filter(
							(method) => !method.credit_limit_restricted
						);
					}
				} else {
					this.paymentMethodsUnlock = this.paymentMethodsFromConfigBase;
				}
				this.paymentMethodsLock = this.paymentMethodsFromConfigBase.filter(
					(method) => !this.paymentMethodsUnlock.includes(method)
				);
				this.render(true);
			});
		}

        updateCashPaymentMethod() {
			const order = this.currentOrder;
            const orderLines = order.orderlines;

			for (let line of orderLines){
				
				if (line.product.cash_item){
					this.paymentMethodsUnlock = this.paymentMethodsFromConfigBase.filter(
						paymentMethod => paymentMethod['name'] == 'Cash'
					)
					this.render(true)
					return;
				}
			}
			if (order.partner){
				this.updateCreditPaymentMethod()
				this.render(true)
				return;
			}
			this.paymentMethodsUnlock = this.paymentMethodsFromConfigBase

            // orderLines.forEach( line => {
            //         if (line.product.cash_item) {
			// 			this.paymentMethodsUnlock = []
            //             this.paymentMethodsUnlock = this.paymentMethodsFromConfigBase.filter(
            //                 paymentMethod => paymentMethod['name'] == 'Cash'
            //             )
            //         }
            //         else {
			// 			if (order.partner){
			// 				this.updateCreditPaymentMethod()}
			// 			else{
            //             	this.paymentMethodsUnlock = this.paymentMethodsFromConfigBase}
            //         }
            //     }
            // )

            this.render(true)
        }
	}

Registries.Component.extend(PaymentScreen, PaymentScreenRisk)
