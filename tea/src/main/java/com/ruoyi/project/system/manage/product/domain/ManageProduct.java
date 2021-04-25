package com.ruoyi.project.system.manage.product.domain;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import com.ruoyi.framework.aspectj.lang.annotation.Excel;
import com.ruoyi.framework.web.domain.BaseEntity;

/**
 * 11对象 manage_product
 * 
 * @author caoyl
 * @date 2021-04-19
 */
public class ManageProduct extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** 主键 */
    private Long id;

    /** 名称 */
    @Excel(name = "名称")
    private String name;

    /** 产品类别 */
    @Excel(name = "产品类别")
    private String category;

    /** 产品链接 */
    @Excel(name = "产品链接")
    private String link;

    /** 产品详情 */
    @Excel(name = "产品详情")
    private String details;

    /** 产品图片 */
    @Excel(name = "产品详情图片")
    private String picture;

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    @Excel(name = "产品封面图片")
    private String cover;

    /** 上下架状态，0上架 1下架 */
    @Excel(name = "上下架状态，0上架 1下架")
    private Integer status;

    /** 序号 */
    @Excel(name = "序号")
    private Long sort;

    /** 删除标志（0代表存在 2代表删除） */
    private String delFlag;

    public void setId(Long id)
    {
        this.id = id;
    }

    public Long getId()
    {
        return id;
    }
    public void setName(String name)
    {
        this.name = name;
    }

    public String getName()
    {
        return name;
    }
    public void setCategory(String category)
    {
        this.category = category;
    }

    public String getCategory()
    {
        return category;
    }
    public void setLink(String link)
    {
        this.link = link;
    }

    public String getLink()
    {
        return link;
    }
    public void setDetails(String details)
    {
        this.details = details;
    }

    public String getDetails()
    {
        return details;
    }
    public void setPicture(String picture)
    {
        this.picture = picture;
    }

    public String getPicture()
    {
        return picture;
    }
    public void setStatus(Integer status)
    {
        this.status = status;
    }

    public Integer getStatus()
    {
        return status;
    }
    public void setSort(Long sort)
    {
        this.sort = sort;
    }

    public Long getSort()
    {
        return sort;
    }
    public void setDelFlag(String delFlag)
    {
        this.delFlag = delFlag;
    }

    public String getDelFlag()
    {
        return delFlag;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this,ToStringStyle.MULTI_LINE_STYLE)
            .append("id", getId())
            .append("name", getName())
            .append("category", getCategory())
            .append("link", getLink())
            .append("details", getDetails())
            .append("picture", getPicture())
            .append("cover", getCover())
            .append("status", getStatus())
            .append("createBy", getCreateBy())
            .append("createTime", getCreateTime())
            .append("updateBy", getUpdateBy())
            .append("updateTime", getUpdateTime())
            .append("sort", getSort())
            .append("delFlag", getDelFlag())
            .toString();
    }
}
