FROM microsoft/dotnet:2.1-aspnetcore-runtime
ADD ./out ./app
WORKDIR /app
EXPOSE 5006
ENTRYPOINT dotnet form-service.dll