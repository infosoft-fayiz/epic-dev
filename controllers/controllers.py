# -*- coding: utf-8 -*-
# from odoo import http


# class EpicPosDev(http.Controller):
#     @http.route('/epic_pos_dev/epic_pos_dev', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/epic_pos_dev/epic_pos_dev/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('epic_pos_dev.listing', {
#             'root': '/epic_pos_dev/epic_pos_dev',
#             'objects': http.request.env['epic_pos_dev.epic_pos_dev'].search([]),
#         })

#     @http.route('/epic_pos_dev/epic_pos_dev/objects/<model("epic_pos_dev.epic_pos_dev"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('epic_pos_dev.object', {
#             'object': obj
#         })
