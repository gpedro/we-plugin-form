/**
 * Render we.js form
 *
 * usage: {{{form formName valuesObject}}}
 */

module.exports = function(we) {
  return function form (formName, values, options) {
    if (!we.form.forms[formName]) {
      we.log.warn('form '+ formName + ' not found in we.form object.');
      return '';
    }

    var formId = formName;
    if (!values) values = {};

    var theme = options.data.root.theme;
    if (!theme) theme = 'app';
    var html = '';
    var fields = '';
    var type, attr;

    for ( var attrName in we.form.forms[formName].fields) {
      attr = we.form.forms[formName].fields[attrName];
      type = typeof attr;
      var value = values[attrName];
      if (!value) value = '';

      // use type attr
      fields += we.view.renderTemplate(
        'forms/' + attr.type, theme,
        {
          value: value,
          field: attr,
          name: attrName,
          formId: formId,
          fieldName: 'form-' + formName + '-' + attrName,
          fieldId: formId + '-' + attrName,
          placeholder: 'form-placeholder-' + formName + '-' + attrName,
          __: this.__
        }
      );
    }

    var controllAttrs = '';
    if (we.form.forms[formName].actionType) {
      controllAttrs += ' we-submit="'+we.form.forms[formName].actionType+'" ';
    }

    html += we.view.renderTemplate('forms/form', theme, {
      formId: formId,
      formName: formName,
      form: we.form.forms[formName],
      fields: fields,
      context: this,
       __: this.__ ,
      controllAttrs: controllAttrs
    });

    return html;
  }
}