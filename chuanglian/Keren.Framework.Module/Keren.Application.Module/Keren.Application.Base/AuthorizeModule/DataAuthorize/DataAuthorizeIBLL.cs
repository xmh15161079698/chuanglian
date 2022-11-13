using Keren.Util;
using System.Collections.Generic;

namespace Keren.Application.Base.AuthorizeModule
{
    /// <summary>
    /// �� �� Keren-ADMS V7.0.6 �������ݿ������
    /// Copyright (c) 2015-2020 �ɶ�����������޹�˾
    /// �� ��������-��ܿ�����
    /// �� �ڣ�2017-06-21 16:30
    /// �� ��������Ȩ��
    /// </summary>
    public interface DataAuthorizeIBLL
    {
        #region ��ȡ����
        /// <summary>
        /// ��ȡ�����б�����
        /// </summary>
        /// <param name="relationId">��ϵ����</param>
        /// <returns></returns>
        IEnumerable<DataAuthorizeConditionEntity> GetDataAuthorizeConditionList(string relationId);
        /// <summary>
        /// ��ȡ����Ȩ�޶�Ӧ��ϵ�����б�
        /// </summary>
        /// <param name="moduleId">ģ������</param>
        /// <returns></returns>
        IEnumerable<DataAuthorizeRelationEntity> GetRelationList(string moduleId);
        /// <summary>
        /// ��ȡ����Ȩ�޶�Ӧ��ϵ�����б�
        /// </summary>
        /// <param name="moduleId">ģ������</param>
        /// <param name="pagination">��ҳ����</param>
        /// <param name="keyword">��ѯ�ؼ���</param>
        /// <param name="objectId">��������</param>
        /// <param name="type">���� 2 �Զ����</param>
        /// <returns></returns>
        IEnumerable<DataAuthorizeRelationEntity> GetRelationPageList(Pagination pagination, string moduleId, string keyword, string objectId,int type);
        /// <summary>
        /// ��ȡ����Ȩ��������
        /// </summary>
        /// <param name="moduleId">����ģ������</param>
        /// <param name="objectId">��Ӧ��ɫ���û�����</param>
        /// <returns></returns>
        IEnumerable<DataAuthorizeConditionEntity> GetConditionList(string moduleId, string objectId);
        /// <summary>
        /// ��ȡʵ��
        /// </summary>
        /// <param name="keyValue">����</param>
        /// <returns></returns>
        DataAuthorizeRelationEntity GetRelationEntity(string keyValue);
        #endregion

        #region �ύ����
        /// <summary>
        /// ɾ��ʵ������
        /// </summary>
        /// <param name="keyValue">����</param>
        void DeleteEntity(string keyValue);
        /// <summary>
        /// ����ʵ�����ݣ��������޸ģ�
        /// </summary>
        /// <param name="keyValue">����</param>
        /// <param name="relationEntity"></param>
        /// <param name="conditionEntityList"></param>
        void SaveEntity(string keyValue, DataAuthorizeRelationEntity relationEntity, List<DataAuthorizeConditionEntity> conditionEntityList);
        #endregion

        #region ��չ����
        /// <summary>
        /// ���ò�ѯ���
        /// </summary>
        /// <param name="url">�ӿڵ�ַ</param>
        /// <param name="isCustmerForm">�Ƿ����Զ����</param>
        /// <returns></returns>
        bool SetWhereSql(string url, bool isCustmerForm);
        #endregion
    }
}
