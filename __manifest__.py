# -*- coding: utf-8 -*-
{
    'name': "epic_pos_dev",
    'summary': "",
    'description': "",
    'author': "Fayiz Asad",
    'website': "",
    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/16.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '0.1',
    # any module necessary for this one to work correctly
    'depends': ['point_of_sale','account','web'],
    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/pos_payment_method_views.xml',
        'views/res_config_settings_views.xml',       
    ],
    'assets':{
        'point_of_sale.assets':[
            'epic_pos_dev/static/src/js/*.js',
            'epic_pos_dev/static/src/xml/*.xml',
            # 'epic_pos_dev/static/src/scss/*.scss',
        ],
    },
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
}
