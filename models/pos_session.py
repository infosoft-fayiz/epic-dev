from odoo import fields, models

class PosSession(models.Model):
    _inherit = "pos.session"

    def _loader_params_pos_payment_method(self):
        params = super(PosSession, self)._loader_params_pos_payment_method()
        params['search_params']['fields'].append("credit_limit_restricted")
        return params

    def _loader_params_product_product(self):
        result = super(PosSession, self)._loader_params_product_product()
        result['search_params']['fields'].append('cash_item')
        return result    