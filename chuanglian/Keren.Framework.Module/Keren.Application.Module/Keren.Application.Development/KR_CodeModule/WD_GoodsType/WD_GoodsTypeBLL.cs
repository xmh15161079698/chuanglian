using Keren.Util;
using System;
using System.Data;
using System.Collections.Generic;
using Keren.Application.Development.KR_CodeModule.Common;
using System.Collections;

namespace Keren.Application.Development.KR_CodeModule
{
    /// <summary>
    /// 版 本 Keren-ADMS V7.0.6 可人敏捷开发框架
    /// Copyright (c) 2015-2020 成都可人软件有限公司
    /// 创 建：超级管理员
    /// 日 期：2022-10-27 10:58
    /// 描 述：商品系列管理
    /// </summary>
    public class WD_GoodsTypeBLL : WD_GoodsTypeIBLL
    {
        private WD_GoodsTypeService wD_GoodsTypeService = new WD_GoodsTypeService();

        #region 获取数据

        public IEnumerable<WD_GoodsTypeEntity> GetGoodsCateList_S(string id)
        {
            try
            {
                return wD_GoodsTypeService.GetGoodsCateList_S(id);
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

        public ArrayList GetGoodsTypeCateList()
        {
            try
            {
                var list = wD_GoodsTypeService.GetGoodsTypeCateList();
                ArrayList levelCatalogVos = new ArrayList();
                //所有内容进行遍历
                foreach (var levelCatalog in list)
                {
                    //找出一级分类，赋值到vo类，加入到集合中去
                    if (levelCatalog.F_ParentId == "0")
                    {
                        LevelCatalogVo levelCatalogVo = new LevelCatalogVo();
                        CopyProperties(levelCatalog, levelCatalogVo);
                        //为一级分类设置子分类
                        levelCatalogVo.Children=getChildrens(levelCatalogVo, list);
                        levelCatalogVos.Add(levelCatalogVo);
                    }
                }
                return levelCatalogVos;
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

        private ArrayList getChildrens(LevelCatalogVo root, IEnumerable<WD_GoodsTypeEntity> levelCatalogs)
        {
            //由于子分类下可能还有子分类，因此依旧需要创建一个需要返回的vo展示集合对象
           ArrayList levelCatalogVos = new ArrayList();
            //依旧将所有内容进行遍历
            foreach (var levelCatalog in levelCatalogs)
            {
                //取出相应子类，加到集合中并返回
                if (root.F_Id == levelCatalog.F_ParentId)
                {
                    LevelCatalogVo levelCatalogVo = new LevelCatalogVo();
                    CopyProperties(levelCatalog, levelCatalogVo);
                    //使用递归，循序渐进式设置完各大小级分类
                    levelCatalogVo.Children= getChildrens(levelCatalogVo, levelCatalogs);
                    //最总加入到集合中去
                    levelCatalogVos.Add(levelCatalogVo);
                }
            }
            return levelCatalogVos;
        }

        private void CopyProperties(WD_GoodsTypeEntity entity,LevelCatalogVo level)
        {
            level.F_Id = entity.F_Id;
            level.F_Goods_TypeName = entity.F_Goods_TypeName;
            level.F_ParentId = entity.F_ParentId;
        }

        public WD_GoodsTypeEntity GetGoodsTypeById(string id)
        {
            try
            {
                return wD_GoodsTypeService.GetGoodsTypeById(id);
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
        public IEnumerable<WD_GoodsTypeEntity> GetPageList(Pagination pagination, string queryJson)
        {
            try
            {
                return wD_GoodsTypeService.GetPageList(pagination, queryJson);
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
        /// 获取WD_GoodsType表实体数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        /// <returns></returns>
        public WD_GoodsTypeEntity GetWD_GoodsTypeEntity(string keyValue)
        {
            try
            {
                return wD_GoodsTypeService.GetWD_GoodsTypeEntity(keyValue);
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
                wD_GoodsTypeService.DeleteEntity(keyValue);
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
        public void SaveEntity(string keyValue, WD_GoodsTypeEntity entity)
        {
            try
            {
                wD_GoodsTypeService.SaveEntity(keyValue, entity);
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
