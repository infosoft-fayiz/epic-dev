from odoo import fields, models

class ProductTemplate(models.Model):
    _inherit = 'product.template'

    cash_item = fields.Boolean("Cash Item")

    
    # def _get_pos_product_info(self, params):
    #     return self.env['product.template'].search_read(**params['search_params'])