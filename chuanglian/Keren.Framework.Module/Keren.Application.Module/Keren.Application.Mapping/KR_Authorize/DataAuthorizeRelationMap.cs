using Keren.Application.Base.AuthorizeModule;
using System.Data.Entity.ModelConfiguration;

namespace  Keren.Application.Mapping
{
    /// <summary>
    /// �� �� Keren-ADMS V7.0.6 �������ݿ������
    /// Copyright (c) 2015-2020 �ɶ�����������޹�˾
    /// �� ��������-��ܿ�����
    /// �� �ڣ�2017-06-21 16:30
    /// �� ��������Ȩ��
    /// </summary>
    public class KR_Base_DataAuthorizeRelationMap : EntityTypeConfiguration<DataAuthorizeRelationEntity>
    {
        public KR_Base_DataAuthorizeRelationMap()
        {
            #region ������
            //��
            this.ToTable("KR_BASE_DATARELATION");
            //����
            this.HasKey(t => t.F_Id);
            #endregion

            #region ���ù�ϵ
            #endregion
        }
    }
}

