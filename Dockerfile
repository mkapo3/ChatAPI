#Build Stage
FROM mcr.microsoft.com/dotnet/sdk:6.0-focal AS build
WORKDIR /source
COPY . .
RUN dotnet restore "./ChatAPI.API/ChatAPI.API.csproj" --disable-parallel
RUN dotnet restore "./ChatAPI.API/ChatAPI.API.csproj" -c release -o /app --no-restore

#Server Stage
FROM mcr.microsoft.com/dotnet/aspnet:6.0-focal
WORKDIR /app
COPY --from=build /app ./

EXPOSE 5000

ENTRYPOINT ["dotnet", "ChatAPI.API.dll"]


