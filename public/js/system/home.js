/**
 * @file 
 * @author tanshaohui <tanshaohui@baidu.com>
 * @date 2016-01-12 19:31:54
 * @last-modified-by tanshaohui
 * @last-modified-time 2016-01-13 10:06:23
 */

$('#ufile').on('change', function (e) {
    var data = new FormData();
    var files = $(this).get(0).files;
    if (files) {
        data.append('ufile', files[0]);
    }
    $.ajax({
        url:'/api/auth/upload',
        type: 'post',             
        data: data,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (data) {
            if (data.errno === 0) {
                $('#pic-preview').css({
                    backgroundImage: 'url(' + data.url + ')'
                }).text('');
            } else {
                $('#pic-preview').css({
                    backgroundImage: 'none'
                }).text(data.msg);
            }
        }
    });
});