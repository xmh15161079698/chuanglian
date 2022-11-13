using Keren.Util;
using System;
using System.Data;
using System.Collections.Generic;

namespace Keren.Application.Development.KR_CodeModule
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2022-10-24 15:19
    /// 描 述：商品类别
    /// </summary>
    public class WD_GoodsClassBLL : WD_GoodsClassIBLL
    {
        private WD_GoodsClassService wD_GoodsClassService = new WD_GoodsClassService();

        #region 获取数据

        public IEnumerable<WD_GoodsClassEntity> GetGoodsCateList_S(string id)
        {
            try
            {
                return wD_GoodsClassService.GetGoodsCateList_S(id);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        public IEnumerable<WD_GoodsClassEntity> GetGoodsCateList_P()
        {
            try
            {
                return wD_GoodsClassService.GetGoodsCateList_P();
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }
        public IEnumerable<WD_GoodsClassEntity> GetGoodsCateList()
        {
            try
            {
                return wD_GoodsClassService.GetGoodsCateList();
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        public WD_GoodsClassEntity GetColorByGoodsId(string goodsId)
        {
            try
            {
                return wD_GoodsClassService.GetColorByGoodsId(goodsId);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        public WD_GoodsClassEntity GetStyleByGoodsId(string goodsId)
        {
            try
            {
                return wD_GoodsClassService.GetStyleByGoodsId(goodsId);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        public WD_GoodsClassEntity GetSpaceByGoodsId(string goodsId)
        {
            try
            {
                return wD_GoodsClassService.GetSpaceByGoodsId(goodsId);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        /// <summary>
        /// 获取页面显示列表数据
        /// </summary>
        /// <param name="pagination">分页参数</param>
        /// <param name="queryJson">查询参数</param>
        /// <returns></returns>
        public IEnumerable<WD_GoodsClassEntity> GetPageList(Pagination pagination, string queryJson)
        {
            try
            {
                return wD_GoodsClassService.GetPageList(pagination, queryJson);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        /// <summary>
        /// 获取WD_GoodsClass表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public WD_GoodsClassEntity GetWD_GoodsClassEntity(string keyValue)
        {
            try
            {
                return wD_GoodsClassService.GetWD_GoodsClassEntity(keyValue);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        #endregion

        #region 提交数据

        /// <summary>
        /// 删除实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        public void DeleteEntity(string keyValue)
        {
            try
            {
                wD_GoodsClassService.DeleteEntity(keyValue);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        /// <summary>
        /// 保存实体数据（新增、修改）
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <param name="entity">实体</param>
        /// <returns></returns>
        public void SaveEntity(string keyValue, WD_GoodsClassEntity entity)
        {
            try
            {
                wD_GoodsClassService.SaveEntity(keyValue, entity);
            }
            catch (Exception ex)
            {
                if (ex is ExceptionEx)
                {
                    throw;
                }
                else
                {
                    throw ExceptionEx.ThrowBusinessException(ex);
                }
            }
        }

        #endregion

    }
}
