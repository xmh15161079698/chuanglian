using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

namespace Keren.Util
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创建人：可人-框架开发组
    /// 日 期：2019.03.08
    /// 描 述：获取验证码图片
    /// </summary>
    public class VerifyCode
    {
        /// <summary>
        /// 生成验证码
        /// </summary>
        /// <returns></returns>
        public byte[] GetVerifyCode()
        {
            int codeW = 80;
            int codeH = 30;
            int fontSize = 16;
            string chkCode = string.Empty;
            //颜色列表，用于验证码、噪线、噪点 
            Color[] color = { Color.Black, Color.Red, Color.Blue, Color.Green, Color.Orange, Color.Brown, Color.Brown, Color.DarkBlue };
            //字体列表，用于验证码 
            string[] font = { "Times New Roman" };
            //验证码的字符集，去掉了一些容易混淆的字符 
            char[] character = { '2', '3', '4', '5', '6', '8', '9', 'a', 'b', 'd', 'e', 'f', 'h', 'k', 'm', 'n', 'r', 'x', 'y', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'W', 'X', 'Y' };
            Random rnd = new Random();
            //生成验证码字符串 
            for (int i = 0; i < 4; i++)
            {
                chkCode += character[rnd.Next(character.Length)];
            }
            //写入Session、验证码加密
            WebHelper.WriteSession("session_verifycode", Md5Helper.Encrypt(chkCode.ToLower(), 16));
            //创建画布
            Bitmap bmp = new Bitmap(codeW, codeH);
            Graphics g = Graphics.FromImage(bmp);
            g.Clear(Color.White);
            //画噪线 
            for (int i = 0; i < 1; i++)
            {
                int x1 = rnd.Next(codeW);
                int y1 = rnd.Next(codeH);
                int x2 = rnd.Next(codeW);
                int y2 = rnd.Next(codeH);
                Color clr = color[rnd.Next(color.Length)];
                g.DrawLine(new Pen(clr), x1, y1, x2, y2);
            }
            //画验证码字符串 
            for (int i = 0; i < chkCode.Length; i++)
            {
                string fnt = font[rnd.Next(font.Length)];
                Font ft = new Font(fnt, fontSize);
                Color clr = color[rnd.Next(color.Length)];
                g.DrawString(chkCode[i].ToString(), ft, new SolidBrush(clr), (float)i * 18, (float)0);
            }
            //将验证码图片写入内存流，并将其以 "image/Png" 格式输出 
            MemoryStream ms = new MemoryStream();
            try
            {
                bmp.Save(ms, ImageFormat.Png);
                return ms.ToArray();
            }
            catch (Exception)
            {
                return null;
            }
            finally
            {
                g.Dispose();
                bmp.Dispose();
            }
        }
        /// <summary>
        /// 生成图片验证码
        /// </summary>
        /// <returns></returns>
        public byte[] GetImageCode(string sessionId)
        {
            int codeW = 80;
            int codeH = 30;
            int fontSize = 16;
            string chkCode = string.Empty;
            //颜色列表，用于验证码、噪线、噪点 
            Color[] color = { Color.Black, Color.Red, Color.Blue, Color.Green, Color.Orange, Color.Brown, Color.Brown, Color.DarkBlue };
            //字体列表，用于验证码 
            string[] font = { "Times New Roman" };
            //验证码的字符集，去掉了一些容易混淆的字符 
            char[] character = { '0', '1', '2', '3', '4', '5', '6', '8', '9' };
            Random rnd = new Random();
            //生成验证码字符串 
            for (int i = 0; i < 4; i++)
            {
                chkCode += character[rnd.Next(character.Length)];
            }
            //写入Cookie、验证码加密
            WebHelper.WriteCookie(sessionId, Md5Helper.Encrypt(chkCode.ToLower(), 16));
            //创建画布
            Bitmap bmp = new Bitmap(codeW, codeH);
            Graphics g = Graphics.FromImage(bmp);
            g.Clear(Color.White);
            //画噪线 
            for (int i = 0; i < 1; i++)
            {
                int x1 = rnd.Next(codeW);
                int y1 = rnd.Next(codeH);
                int x2 = rnd.Next(codeW);
                int y2 = rnd.Next(codeH);
                Color clr = color[rnd.Next(color.Length)];
                g.DrawLine(new Pen(clr), x1, y1, x2, y2);
            }
            //画验证码字符串 
            for (int i = 0; i < chkCode.Length; i++)
            {
                string fnt = font[rnd.Next(font.Length)];
                Font ft = new Font(fnt, fontSize);
                Color clr = color[rnd.Next(color.Length)];
                g.DrawString(chkCode[i].ToString(), ft, new SolidBrush(clr), (float)i * 18, (float)0);
            }
            //将验证码图片写入内存流，并将其以 "image/Png" 格式输出 
            MemoryStream ms = new MemoryStream();
            try
            {
                bmp.Save(ms, ImageFormat.Png);
                return ms.ToArray();
            }
            catch (Exception)
            {
                return null;
            }
            finally
            {
                g.Dispose();
                bmp.Dispose();
            }
        }
        /// <summary>
        /// 生成图片验证码
        /// </summary>
        /// <returns></returns>
        public string GetMessageCode(string sessionId)
        {
            string chkCode = string.Empty;
            //验证码的字符集，去掉了一些容易混淆的字符 
            char[] character = { '0', '1', '2', '3', '4', '5', '6', '8', '9' };
            Random rnd = new Random();
            //生成验证码字符串 
            for (int i = 0; i < 4; i++)
            {
                chkCode += character[rnd.Next(character.Length)];
            }
            //写入Cookie、验证码加密
            WebHelper.WriteCookie(sessionId, Md5Helper.Encrypt(chkCode.ToLower(), 16));
            //返回验证码
            return chkCode;
        }
        /// <summary>
        /// 检查验证码是否正确
        /// </summary>
        /// <param name="sessionId"></param>
        /// <param name="code"></param>
        /// <returns></returns>
        public static bool CheckCode(string sessionId,string code)
        {
            //根据sessionId读取cookie
            string res =  WebHelper.GetCookie(sessionId);
            if (!string.IsNullOrEmpty(res))
            {
                return string.Equals(res, Md5Helper.Encrypt(code.ToLower(), 16));
            }
            else
            {
                return false;
            }
        }
    }
}
