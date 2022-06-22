<template>
  <div>
    <!--    `:http-request="upload" 开启自定义上传-->
    <el-upload
      :before-upload="beforeAvatarUpload"
      :http-request="upload"
      :show-file-list="false"
      action="#"
      class="avatar-uploader"
    >
      <!--      图片上传预览-->
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"/>
    </el-upload>
  </div>
</template>

<script>
// 导入cos的SDK调用
import COS from 'cos-js-sdk-v5'

const cos = new COS({
  SecretId: 'AKIDJSLzNVMyKPEn5rMaZHismQnunPkob9QR', // 身份识别ID
  SecretKey: 'lGUR7WfZDaiZ9SVIp67rKWR6UbS2LOBi' // 身份秘钥
})
export default {
  data() {
    return {
      imageUrl: ''
    }
  },
  methods: {
    // handleAvatarSuccess(res, file) {
    //   this.imageUrl = URL.createObjectURL(file.raw)
    // },
    // 自定义上传
    upload(params) {
      // console.log(params)
      // 云上传代码
      cos.putObject({
        Bucket: 'hr-cms-1311688877', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-beijing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: '1.jpg', /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        StorageClass: 'STANDARD',
        Body: params.file, // 上传文件对象
        onProgress: (progressData) => {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        // 上传失败或成功
        console.log(err || data)
        if (data.statusCode === 200) {
          this.imageUrl = `https://${data.Location}`
        }
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

