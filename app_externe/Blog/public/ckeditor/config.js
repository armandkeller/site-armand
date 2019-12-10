CKEDITOR.editorConfig = function( config ) {
    config.toolbarGroups = [
        { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
        { name: 'forms', groups: [ 'forms' ] },
        '/',
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
        { name: 'links', groups: [ 'links' ] },
        { name: 'insert', groups: [ 'insert' ] },
        '/',
        { name: 'styles', groups: [ 'styles' ] },
        { name: 'colors', groups: [ 'colors' ] },
        { name: 'tools', groups: [ 'tools' ] },
        { name: 'others', groups: [ 'others' ] },
        { name: 'about', groups: [ 'about' ] }
    ];

    config.removeButtons = 'Styles,Maximize,Image,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,BidiLtr,BidiRtl,Language,CreateDiv,Outdent,Indent,RemoveFormat,CopyFormatting,Strike,Subscript,Superscript,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,SelectAll,Find,Replace,Redo,Undo,Cut,Copy,Paste,PasteText,PasteFromWord,Templates,Save,NewPage,Preview,Print,Source,Scayt,ShowBlocks,Anchor,BGColor';
};