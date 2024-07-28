package org.cnpm.api.persistence;

import com.zaxxer.hikari.HikariDataSource;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

@Configuration
@MapperScan(basePackages = { "org.cnpm.api.persistence.mapper" }, sqlSessionFactoryRef ="DefaultSqlSessionFactory")
@EnableTransactionManagement
public class DefaultDatabaseConfig {
    @Bean(name = "DefaultSqlSessionFactory")
    public SqlSessionFactory defaultSqlSessionFactory(@Qualifier("DefaultDataSource") DataSource dataSource) throws Exception {

        final SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
        sessionFactory.setDataSource(dataSource);

        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        Resource[] resources = ArrayUtils.addAll(
                resolver.getResources("classpath:mapper/*.xml"),
                resolver.getResources("classpath:mapper/*/*.xml")
        );
        sessionFactory.setMapperLocations(resources);

        return sessionFactory.getObject();
    }

    @Bean(name = "DefaultDataSourceProp")
    @ConfigurationProperties("spring.datasource.default")
    public DataSourceProperties defaultDataSourceProp() {
        return new DataSourceProperties();
    }

    @Bean(name = "DefaultDataSource")
    public HikariDataSource defaultDataSource(@Qualifier("DefaultDataSourceProp") DataSourceProperties properties) {
        return properties.initializeDataSourceBuilder().type(HikariDataSource.class).build();
    }

    @Bean
    public DataSourceTransactionManager transactionManager(@Qualifier("DefaultDataSource") DataSource dataSource) throws Exception {
        return new DataSourceTransactionManager(dataSource);
    }

}
