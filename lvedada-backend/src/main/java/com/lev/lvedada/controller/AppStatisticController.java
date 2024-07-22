package com.lev.lvedada.controller;

import cn.hutool.core.io.FileUtil;
import com.lev.lvedada.common.BaseResponse;
import com.lev.lvedada.common.ErrorCode;
import com.lev.lvedada.common.ResultUtils;
import com.lev.lvedada.constant.FileConstant;
import com.lev.lvedada.exception.BusinessException;
import com.lev.lvedada.exception.ThrowUtils;
import com.lev.lvedada.manager.CosManager;
import com.lev.lvedada.mapper.UserAnswerMapper;
import com.lev.lvedada.model.dto.file.UploadFileRequest;
import com.lev.lvedada.model.dto.statistic.AppAnswerCountDTO;
import com.lev.lvedada.model.dto.statistic.AppAnswerResultCountDTO;
import com.lev.lvedada.model.entity.User;
import com.lev.lvedada.model.enums.FileUploadBizEnum;
import com.lev.lvedada.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.Arrays;
import java.util.List;

/**
 * App 统计分析接口
 *
 */
@RestController
@RequestMapping("/app/statistic")
@Slf4j
public class AppStatisticController {

    @Resource
    private UserAnswerMapper userAnswerMapper;

    /**
     * 热门应用及回答数统计（top 10）
     *
     * @return
     */
    @GetMapping("/answer_count")
    public BaseResponse<List<AppAnswerCountDTO>> getAppAnswerCount() {
        return ResultUtils.success(userAnswerMapper.doAppAnswerCount());
    }

    /**
     * 某应用回答结果分布统计
     *
     * @param appId
     * @return
     */
    @GetMapping("/answer_result_count")
    public BaseResponse<List<AppAnswerResultCountDTO>> getAppAnswerResultCount(Long appId) {
        ThrowUtils.throwIf(appId == null || appId <= 0, ErrorCode.PARAMS_ERROR);
        return ResultUtils.success(userAnswerMapper.doAppAnswerResultCount(appId));
    }
}
